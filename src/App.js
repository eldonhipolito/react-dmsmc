import React, { Component } from 'react'
import * as context from './utils/Bootstrapper'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contractInstances : {},
      someText : "vale",
    }

  }

  componentDidMount() {
    this.instantiateContract();
  }

  instantiateContract() {
    context.initContractInstances.then(instances => {
      this.setState({contractInstances : instances,
      someText : instances.identities.address});
    });
  }

  render() {
    return (
      <div id="mamaw">
        {this.state.someText}
      </div>
    );
  }
}

export default App
