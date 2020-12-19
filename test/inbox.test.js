const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface , bytecode } = require('../compile');

let accounts;
let inbox;
const INITIAL_STRING = 'HI THERE!'

beforeEach(async () => {
	// Get a list of all accounts
	accounts = await web3.eth.getAccounts();

	// use an account to deploy the contract
	inbox = await new web3.eth.Contract(JSON.parse(interface))
	.deploy({ data:bytecode, arguments: [INITIAL_STRING] })
	.send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
	it('Contract deployment', () => {
		assert.ok(inbox.options.address)
	});
	it('Get intial message', async () => {
		const message = await inbox.methods.message().call()
		assert.equal(message, INITIAL_STRING)
	});
	it('Set message', async () => {
		await inbox.methods.setMessage('pulp fiction').send({'from': accounts[0]});
		const message = await inbox.methods.message().call();
		assert.equal(message, 'pulp fiction')
	})
});



// 3.8