import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lotteryContract';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {manager:''};
  }
  //componentDidMount() is a hook that gets invoked right after a React component has been mounted aka after the first render() lifecycle.
  async componentDidMount(){
    const manager = await lottery.methods.manager().call();

    this.setState({manager})
  }

  //the Reactor render method accpets promises right off the batch
  render(){
    if(web3){
      return (
        <div>
          <h2>Lottery Contract</h2>
          <p>This Contract is managed by {this.state.manager} </p>
        </div>
      );
    }
    else {
      console.log('something worng', web3);
    }
  }
};

export default App;
