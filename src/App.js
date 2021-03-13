import React, {Component} from 'react';
import './App.css';
import lottery from './lotteryContract';
import web3 from './web3';
console.log(web3);

/* Time Line on handling Contracts:
      * Component renders ->
      * componentDidMount called ->
      * Call methods on contract ->
      * set data on state;
*/
class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      manager:'',
      players: [],
      balance: '',
      value: '',
      message:''
    };
  }
  //componentDidMount() is a lifecycle method, a hook that gets invoked right after a React component has been mounted aka after the first render() lifecycle.
  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    //const acc = '0x817ac2Ed366D46ACf304429Fc8B216e0C6e79E22';
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({manager, players, balance});//ES6 -> {manager:manager, players:players}
  }

  //the syntax below is made possible by Babel. Note that using the arrow function allows Babel to bind the function to the Components this. context without having us to manuaaly bind it.
  onSubmit = async (event) =>{
    //Prevent DOM to bubble up the form back to the app server
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({message: 'Waiting on transaction success...'});

    //send() is the web3 method that calls the Smart Contract function in the blockchain, and sends the msg.value amount as a deposit to the contract's account in this particular case.
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({players, balance});

    this.setState({message: 'You have been entered!'});
  };

  onClick = async (event) => {
    const accounts = await web3.eth.getAccounts();

    this.setState({message: 'Waiting on transaction success...'});

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({players, balance});
    this.setState({message: 'A winner has been picked!'});
  };

  //the Reactor render method accpets promises right off the batch
  render(){
    //not using {this.onSubmit.bind(this)} due to Babel ES6 and React sugar syntax
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
        This Contract is managed by {this.state.manager}. There are currently  {this.state.players.length}  people entered the lottery,
        competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>
        <hr />
        <form  onSubmit = {this.onSubmit}>
          <h4>Want to try your lucky?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
            value = {this.state.value}
              onChange={event => this.setState({value: event.target.value})}
            />
          </div>
          <button>Enter</button>
        </form>
        <hr />
        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick a Winner!</button>
        <hr />
          <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
