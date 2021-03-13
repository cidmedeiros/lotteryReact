// SPDX-License-Identifier: MIT
pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    function Lottery() public {
        manager = msg.sender;
    }

    function enter() public payable {
        /* payble functions requires the sender account and the range value allowed to pay for the transaction
           require() method checks for validity on the boolean expression, and only if it get's evaluated to True
           the rest of the function's body is allowed to run.
        */
        //set a minimum for entering the lottery
        require(msg.value > .01 ether);
        
        //What I'm paying for? I'm paying for the players's account number to be stored on the Smart Contract actually living in the blockchain
        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }

    function pickWinner() public payable restricted {
        //pseudo random pick the winner
        uint index = random() % players.length;
        //tranfer the prize
        players[index].transfer(this.balance);
        //reset the array of player to a new round. The zero forces all pointers to zeroed out in the memory.
        players = new address[](0);
    }

    //modifier is a method
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }
}