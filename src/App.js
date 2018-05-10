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
    }
    this.instantiateContract();

  }



  instantiateContract() {
    console.log("Instantiating...");
    context.initContractInstances.then(contracts => {
    
      this.setState({contractInstances : contracts.instances,
      contractTemplates : contracts.templates});
    });
  }

  render() {

    return (
      <div id="genesisContainer">
        <DefaultContainer instances={this.state.contractInstances} templates={this.state.contractTemplates} />
      </div>
    );
  }
}

export default App
