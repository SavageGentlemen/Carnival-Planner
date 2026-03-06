/**
 * Deploy CarnivalPassport ERC-1155 contract to Base.
 *
 * Usage:
 *   DEPLOYER_PRIVATE_KEY=0x... npx hardhat run contracts/deploy.js --config hardhat.config.cjs --network base-sepolia
 *   DEPLOYER_PRIVATE_KEY=0x... npx hardhat run contracts/deploy.js --config hardhat.config.cjs --network base
 */

const hre = require('hardhat');

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log('Deploying CarnivalPassport with account:', deployer.address);

    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log('Account balance:', hre.ethers.formatEther(balance), 'ETH');

    // Metadata base URI — update to your Firebase Hosting or IPFS gateway
    const baseURI = 'https://www.carnival-planner.com/api/token/{id}.json';

    const CarnivalPassport = await hre.ethers.getContractFactory('CarnivalPassport');
    const contract = await CarnivalPassport.deploy(baseURI);
    await contract.waitForDeployment();

    const address = await contract.getAddress();
    console.log('');
    console.log('✅ CarnivalPassport deployed to:', address);
    console.log('');
    console.log('Next steps:');
    console.log(`  1. Set .env:  VITE_PASSPORT_CONTRACT=${address}`);
    console.log(`  2. Firebase:  firebase functions:config:set web3.contract="${address}"`);
    console.log(`  3. Firebase:  firebase functions:config:set web3.private_key="<YOUR_KEY>"`);
    console.log(`  4. Deploy:    npm run build && firebase deploy`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
