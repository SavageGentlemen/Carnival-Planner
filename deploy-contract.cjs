#!/usr/bin/env node
/**
 * Self-contained CarnivalPassport deployer.
 * Installs ethers + solc into /tmp — zero project dependencies needed.
 *
 * Usage:
 *   DEPLOYER_PRIVATE_KEY=0x... node deploy-contract.cjs
 *   DEPLOYER_PRIVATE_KEY=0x... NETWORK=mainnet node deploy-contract.cjs
 */

const { execSync } = require('child_process');
const { readFileSync } = require('fs');
const { join } = require('path');

// ── Install deps to temp dir ──
const TMP_MODULES = '/tmp/carnival-deploy-modules';

function ensureDeps() {
    try {
        require(join(TMP_MODULES, 'node_modules', 'ethers'));
        require(join(TMP_MODULES, 'node_modules', 'solc'));
        console.log('✅ Dependencies found in cache');
        return;
    } catch { }

    console.log('📦 Installing ethers + solc + OpenZeppelin to /tmp...');
    try {
        // Fix npm cache ownership first, then install
        execSync(
            `mkdir -p ${TMP_MODULES} && cd ${TMP_MODULES} && npm init -y 2>/dev/null && npm install ethers@^6.13 solc@0.8.28 @openzeppelin/contracts@^5.0.0 --cache /tmp/.npm-deploy-cache 2>&1`,
            { cwd: TMP_MODULES, stdio: 'inherit', env: { ...process.env, HOME: '/tmp' } }
        );
    } catch (err) {
        console.error('❌ Failed to install dependencies. Try running manually:');
        console.error(`   cd ${TMP_MODULES} && npm install ethers@^6.13 solc@0.8.28`);
        process.exit(1);
    }
}

ensureDeps();

const ethers = require(join(TMP_MODULES, 'node_modules', 'ethers'));
const solc = require(join(TMP_MODULES, 'node_modules', 'solc'));

// ── Config ──
const NETWORKS = {
    sepolia: { name: 'Base Sepolia', rpc: 'https://sepolia.base.org', explorer: 'https://sepolia.basescan.org' },
    mainnet: { name: 'Base Mainnet', rpc: 'https://mainnet.base.org', explorer: 'https://basescan.org' }
};

// ── Compile ──
function compile() {
    const contractPath = join(__dirname, 'contracts', 'CarnivalPassport.sol');
    const source = readFileSync(contractPath, 'utf8');

    const resolveImport = (importPath) => {
        try {
            // Try project node_modules first, then temp modules
            let fullPath;
            try {
                fullPath = join(__dirname, 'node_modules', importPath);
                readFileSync(fullPath, 'utf8');
            } catch {
                fullPath = join(TMP_MODULES, 'node_modules', importPath);
            }
            return { contents: readFileSync(fullPath, 'utf8') };
        } catch {
            return { error: `File not found: ${importPath}` };
        }
    };

    const input = {
        language: 'Solidity',
        sources: { 'CarnivalPassport.sol': { content: source } },
        settings: {
            optimizer: { enabled: true, runs: 200 },
            outputSelection: { '*': { '*': ['abi', 'evm.bytecode.object'] } }
        }
    };

    console.log('🔨 Compiling CarnivalPassport.sol...');
    const output = JSON.parse(solc.compile(JSON.stringify(input), { import: resolveImport }));

    if (output.errors) {
        const errors = output.errors.filter(e => e.severity === 'error');
        if (errors.length > 0) {
            console.error('❌ Compilation errors:');
            errors.forEach(e => console.error(e.formattedMessage));
            process.exit(1);
        }
    }

    const compiled = output.contracts['CarnivalPassport.sol']['CarnivalPassport'];
    return { abi: compiled.abi, bytecode: '0x' + compiled.evm.bytecode.object };
}

// ── Deploy ──
async function main() {
    const privateKey = process.env.DEPLOYER_PRIVATE_KEY;
    if (!privateKey) {
        console.error('❌ Set DEPLOYER_PRIVATE_KEY env var');
        process.exit(1);
    }

    const network = NETWORKS[process.env.NETWORK || 'sepolia'];
    console.log(`\n🌐 Network: ${network.name}`);
    console.log(`   Solc: ${solc.version()}`);

    const { abi, bytecode } = compile();
    console.log(`✅ Compiled — ABI: ${abi.length} entries, Bytecode: ${bytecode.length} chars\n`);

    const provider = new ethers.JsonRpcProvider(network.rpc);
    const wallet = new ethers.Wallet(privateKey, provider);

    console.log(`📍 Deployer: ${wallet.address}`);
    const balance = await provider.getBalance(wallet.address);
    console.log(`💰 Balance: ${ethers.formatEther(balance)} ETH\n`);

    if (balance === 0n) {
        console.error('❌ No ETH! Get some from https://www.base.org/faucet');
        process.exit(1);
    }

    const baseURI = 'https://www.carnival-planner.com/api/token/{id}.json';
    console.log(`📝 Deploying...`);

    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    const contract = await factory.deploy(baseURI);

    console.log(`⏳ Tx: ${contract.deploymentTransaction().hash}`);
    console.log('   Waiting for confirmation...');

    await contract.waitForDeployment();
    const address = await contract.getAddress();

    console.log(`\n${'═'.repeat(60)}`);
    console.log(`✅ CarnivalPassport deployed to: ${address}`);
    console.log(`${'═'.repeat(60)}`);
    console.log(`🔗 ${network.explorer}/address/${address}\n`);
    console.log('Next steps:');
    console.log(`  echo 'VITE_PASSPORT_CONTRACT=${address}' >> .env`);
    console.log(`  firebase functions:secrets:set WEB3_CONTRACT_ADDRESS`);
    console.log(`  firebase functions:secrets:set WEB3_PRIVATE_KEY`);
    console.log(`  npm run build && firebase deploy`);
}

main().catch(err => { console.error('❌', err.message); process.exit(1); });
