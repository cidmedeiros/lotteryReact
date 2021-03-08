import Web3 from 'web3';

//Here we assing to our Web3 Constructor the web3 instance injected in the browser by the Metamask wallet. The currentProvider has already been wired up to the network by the pre settings provided by Metamask. 
const web3 = new Web3(window.web3.currentProvider);

export default web3;