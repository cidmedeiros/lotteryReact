import Web3 from 'web3';

//First we assing to our Web3 Constructor the web3 instance injected in the browser by the Metamask wallet. The currentProvider has already been wired up to the network by the pre settings provided by Metamask..
const web3 = new Web3(window.web3.currentProvider);

//Metamask requires the user to grant the dapp authorization to access the user's account data
window.addEventListener("load", async () => {
  // Modern dapp browsers has an injected Ethereum provider or the Ethereum provider is injected by Metamask itself. However in the latter case the provider is NOT automatically populated with the user's account  
  if (window.ethereum) {
    //Setting up the web3 property of the browser (client) to the same one used by the server in order to allow all dapp's function to work accordinly to dapp's server design.
    window.web3 = new Web3(window.ethereum);
    try {
      // Request account access
      await window.ethereum.enable();
    } catch (error) {
      // User denied account access...
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
  }
  // Non-dapp browsers...
  else {
    console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
  }
});

//exports the same web3 instance as the one set up for the browser during the window load event
export default web3;