import React, { Component } from 'react'


import Submit from './MicroComponents/Submit'
import ErrorPrompt from './MicroComponents/ErrorPrompt'

import InfiniteProgressBar from './MicroComponents/InfiniteProgressBar'

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Identities from './utils/Identities';
import AuthProvider from './utils/AuthProvider';
import CenteredContentGrid from './MicroComponents/CenteredContentGrid';

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted : false,
            authProvider : new AuthProvider(this.props.instances.identities,this.props.templates.Identity,this.props.templates.web3Instance),
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({submitted : true});
        this.state.authProvider.authenticate(this.props.templates.web3Instance.eth.accounts[0]).then((result) => {
          
                this.props.authCallback(result);
           
        }).catch((err) => {
            console.log(err);
            /*
            if(err.message === "Authentication failed") {
                this.setState({submitted : false});
            } else
            if(err.message.startsWith("Error: MetaMask Tx Signature: User denied transaction signature.")) {
                this.setState({submitted : false});
            } else {
             //  this.setState({showError : true});
            }
            */
        });
    }

    render(){
        return (
            <div id="authenticationForm">
                 
                 <CenteredContentGrid>
                    <form onSubmit={this.handleSubmit}>
                    <InfiniteProgressBar visible={this.state.submitted} />
                    <Submit text="Authenticate" disabled={this.state.submitted} />
                    <ErrorPrompt visible={this.state.showError} />
                    </form>
                </CenteredContentGrid>
              
               
             </div>
        );

    }
}

export default withCookies(Authentication);

