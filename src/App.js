import React, {Component} from 'react';
import './App.css';
import lottery from './lotteryContract';

/* Time Line on handling Contracts:
      * Component renders ->
      * componentDidMount called ->
      * Call methods on contract ->
      * set data on state;
*/
class App extends Component {
  constructor(props){
    super(props);

    this.state = {manager:''};
  }
  //componentDidMount() is a lifecycle method, a hook that gets invoked right after a React component has been mounted aka after the first render() lifecycle.
  async componentDidMount(){
    const manager = await lottery.methods.manager().call();

    this.setState({manager})//ES6 -> {manager:manager}
  }

  //the Reactor render method accpets promises right off the batch
  render(){
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This Contract is managed by {this.state.manager} </p>
      </div>
    );
  }
}

export default App;
