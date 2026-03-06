/**
 * Compile + Deploy CarnivalPassport in one step.
 * Downloads solc on-the-fly — no Hardhat needed.
 *
 * Usage:
 *   DEPLOYER_PRIVATE_KEY=0x... node deploy-contract.mjs
 *   DEPLOYER_PRIVATE_KEY=0x... NETWORK=mainnet node deploy-contract.mjs
 */

import { ethers } from 'ethers';
import { readFileSync } from 'fs';
import { createRequire } from 'module';
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Network Config ──
const NETWORKS = {
    sepolia: {
        name: 'Base Sepolia',
        rpc: 'https://sepolia.base.org',
        explorer: 'https://sepolia.basescan.org'
    },
    mainnet: {
        name: 'Base Mainnet',
        rpc: 'https://mainnet.base.org',
        explorer: 'https://basescan.org'
    }
};

// ── Ensure solc is available ──
function loadSolc() {
    const require = createRequire(import.meta.url);
    try {
        return require('solc');
    } catch {
        console.log('📦 Installing solc compiler (one-time)...');
        execSync('npm install solc@0.8.28 --no-save --cache /tmp/solc-cache', {
            cwd: __dirname,
            stdio: 'inherit'
        });
        // Clear require cache and re-require
        delete require.cache[require.resolve('solc')];
        return require('solc');
    }
}

// ── Compile Contract ──
function compileContract(solc) {
    const contractPath = join(__dirname, 'contracts', 'CarnivalPassport.sol');

    // Read OpenZeppelin sources from node_modules
    const resolveImport = (importPath) => {
        try {
            const fullPath = join(__dirname, 'node_modules', importPath);
            return { contents: readFileSync(fullPath, 'utf8') };
        } catch {
            return { error: `File not found: ${importPath}` };
        }
    };

    const input = {
        language: 'Solidity',
        sources: {
            'CarnivalPassport.sol': {
                content: readFileSync(contractPath, 'utf8')
            }
        },
        settings: {
            optimizer: { enabled: true, runs: 200 },
            outputSelection: {
                '*': { '*': ['abi', 'evm.bytecode.object'] }
            }
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
        output.errors
            .filter(e => e.severity === 'warning')
            .forEach(e => console.warn('⚠️', e.message));
    }

    const compiled = output.contracts['CarnivalPassport.sol']['CarnivalPassport'];
    return {
        abi: compiled.abi,
        bytecode: '0x' + compiled.evm.bytecode.object
    };
}

// ── Deploy ──
async function main() {
    const privateKey = process.env.DEPLOYER_PRIVATE_KEY;
    if (!privateKey) {
        console.error('❌ Set DEPLOYER_PRIVATE_KEY environment variable');
        process.exit(1);
    }

    const networkKey = process.env.NETWORK || 'sepolia';
    const network = NETWORKS[networkKey];
    if (!network) {
        console.error(`❌ Unknown network: ${networkKey}. Use 'sepolia' or 'mainnet'.`);
        process.exit(1);
    }

    console.log(`\n🌐 Network: ${network.name}`);

    const solc = loadSolc();
    console.log(`   Solc version: ${solc.version()}`);

    const { abi, bytecode } = compileContract(solc);
    console.log(`✅ Compiled! ABI: ${abi.length} entries, Bytecode: ${bytecode.length} chars\n`);

    const provider = new ethers.JsonRpcProvider(network.rpc);
    const wallet = new ethers.Wallet(privateKey, provider);

    console.log(`📍 Deployer: ${wallet.address}`);
    const balance = await provider.getBalance(wallet.address);
    console.log(`💰 Balance: ${ethers.formatEther(balance)} ETH\n`);

    if (balance === 0n) {
        console.error('❌ No ETH balance!');
        process.exit(1);
    }

    const baseURI = 'https://www.carnival-planner.com/api/token/{id}.json';
    console.log(`📝 Deploying with baseURI: ${baseURI}`);

    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    const contract = await factory.deploy(baseURI);

    console.log(`⏳ Tx sent: ${contract.deploymentTransaction().hash}`);
    console.log('   Waiting for confirmation...');

    await contract.waitForDeployment();
    const address = await contract.getAddress();

    console.log(`\n${'═'.repeat(60)}`);
    console.log(`✅ CarnivalPassport deployed to: ${address}`);
    console.log(`${'═'.repeat(60)}\n`);
    console.log(`🔗 ${network.explorer}/address/${address}\n`);
    console.log('Next steps:');
    console.log(`  echo 'VITE_PASSPORT_CONTRACT=${address}' >> .env`);
    console.log(`  firebase functions:secrets:set WEB3_CONTRACT_ADDRESS`);
    console.log(`  firebase functions:secrets:set WEB3_PRIVATE_KEY`);
    console.log(`  firebase functions:secrets:set WEB3_RPC_URL`);
    console.log(`  npm run build && firebase deploy`);
}

main().catch(err => {
    console.error('❌ Deployment failed:', err.message);
    process.exit(1);
});
