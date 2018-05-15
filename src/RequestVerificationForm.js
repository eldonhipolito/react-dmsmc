import React, { Component } from 'react'

import {Button, Icon, Row, Input, Col} from 'react-materialize'

import Submit from './MicroComponents/Submit'

import ErrorPrompt from './MicroComponents/ErrorPrompt'

import InfiniteProgressBar from './MicroComponents/InfiniteProgressBar'

class RequestVerificationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showError : false,
            submitted : false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);


    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            submitted : true
        });
        this.props.instances.identities.reqIdnVerification(this.props.identityAddress).then((result) => {
            this.props.onCompleteVerificationReq(result.tx);
        }).catch(err => {
            if(err.message.startsWith("Error: MetaMask Tx Signature: User denied transaction signature.")) {
                this.setState({submitted : false, showError : false});
            } else {
                this.setState({showError : true});
            }
        });
    }


    render() {
        
        return (
                <div id="reqVerificationForm">
                <form onSubmit={this.handleSubmit}>
                    <InfiniteProgressBar visible={this.state.submitted} />
                    <Row>
                    <Input label="Your Identity address" name="identityAddress" s={12} value={this.props.identityAddress} />
                    </Row>
                    <Submit disabled={this.state.submitted} />
                    <ErrorPrompt visible={this.state.showError} />
                </form>
              </div>
        );


    }


}

export default RequestVerificationForm;