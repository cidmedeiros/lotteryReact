/* Ideally in the real world a contract is deployed only once. The info for the address and the ABI is generated
just once as well. That's why we'ew using console.log to grab this info and use it in the Lottery.js mirroing the
Lottery.sol file in the contracts folder.   */

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
    'discover strike truck shop curve actress weather cigar address capable census agree',
    'https://rinkeby.infura.io/v3/42876f4968dc464091245c35733de135'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  console.log('abi', interface);
};

deploy();

//use node deploy.js to deploy the contract
deploy();
