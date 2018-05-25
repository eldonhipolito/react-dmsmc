import React, { Component } from 'react'
import * as context from './utils/Bootstrapper'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import DefaultContainer from './DefaultContainer'

class App extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      contractInstances : {},
      contractTemplates : {},
      currentWallet : null,
      loaded : false,
    }
    
  }

  componentDidMount(){
    this.instantiateCurrentWallet();
    this.instantiateContract();
  }



  instantiateContract() {
    console.log("Instantiating...");
    context.initContractInstances.then(contracts => {
    
      this.setState({contractInstances : contracts.instances,
      contractTemplates : contracts.templates,
    loaded : true});
    });
  }

  instantiateCurrentWallet(){
    context.initCurrentWallet.then((address) => {
      this.setState({currentWallet : address});
    });
  }

  render() {
    const container = this.state.loaded ? (
    <DefaultContainer user={this.state.currentWallet} instances={this.state.contractInstances} templates={this.state.contractTemplates} />) : ("");
    return (
      <div id="genesisContainer">
          {container}
      </div>
    );
  }
}

export default App
