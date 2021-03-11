import React, {Component} from 'react';
import './App.css';
import lottery from './lotteryContract';
import web3 from './web3';

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
      balance: ''
    };
  }
  //componentDidMount() is a lifecycle method, a hook that gets invoked right after a React component has been mounted aka after the first render() lifecycle.
  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const acc = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(acc[0]);

    this.setState({manager, players, balance});//ES6 -> {manager:manager, players:players}
  }

  //the Reactor render method accpets promises right off the batch
  render(){
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
        This Contract is managed by {this.state.manager}. There are currently  {this.state.players.length}  people entered the lottery,
        competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>
        <hr />
        <form>
          <h4>Want to try your lucky?</h4>
          <div>
            <label></label>
            <input
              onChange={event => this.setState}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default App;
