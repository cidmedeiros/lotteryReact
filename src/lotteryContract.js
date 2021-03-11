//Import our customized Web3 provider 
import web3 from '../src/web3';

//Both variables came from the deployment operation.
const contractAdress = '0x817ac2Ed366D46ACf304429Fc8B216e0C6e79E22';

const abi = [
    {"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},
    {"constant":false,"inputs":[],"name":"pickWinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
    {"constant":true,"inputs":[],"name":"getPlayers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},
    {"constant":false,"inputs":[],"name":"enter","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},
    {"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},
    {"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}
]

//We're exporting the published ready to go contract with all the presets we did to web3 which will get pushed to the browser through 
export default new web3.eth.Contract(abi, contractAdress);