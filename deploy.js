const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const {interface,bytecode} = require('./compile')

const provider = new HDWalletProvider(
	'orphan moral advice oyster apology belt worth cup diagram cause toe move',
	'https://rinkeby.infura.io/v3/b8a72b5cff004c97bce2bd1e5acbb5c1'
	);
const web3 = new Web3(provider)
;

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();
	console.log('Attemption to deploy from account', accounts[0])

	const receipt = await new web3.eth.Contract(JSON.parse(interface))
	.deploy({ data:bytecode, arguments: ['Initial Message'] })
	.send({ from: accounts[0], gas: '1000000' });	
	
	console.log('Contract deployed to', receipt.options.address);

};
deploy();


//3.12