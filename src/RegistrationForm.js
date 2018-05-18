import React, { Component } from 'react'

import {Button, Icon, Row, Input, Col, ProgressBar} from 'react-materialize'

import Submit from './MicroComponents/Submit'

import ErrorPrompt from './MicroComponents/ErrorPrompt'

import InfiniteProgressBar from './MicroComponents/InfiniteProgressBar'

class RegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username : "",
            name : "",
            submitted: false,
            showError : false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({submitted : true});
        this.props.templates.Identity.new(this.state.username, this.state.name).then((result) => {
            this.props.parentHandler(this.props.stepNum, {address : result.address});
        }).catch((err) => {
            if(err.message.startsWith("Error: MetaMask Tx Signature: User denied transaction signature.")) {
                this.setState({submitted : false});
            } else {
               this.setState({showError : true});
            }
        });
    }


    handleTextChange(e) {
        this.setState(
            {
                [e.target.name] : e.target.value,
            }
        );
    }

    render() {

       
        return (
            <div id="registrationForm">
                 
                <form onSubmit={this.handleSubmit}>
                <InfiniteProgressBar visible={this.state.submitted} />
                <Row> 
                   <Input placeholder="Username" label="Username" name="username" s={12} value={this.state.username} onChange={this.handleTextChange} />
                </Row>
                <Row>
                   <Input placeholder="Name" label="Name" name="name" value={this.state.name} s={12} onChange={this.handleTextChange} />
                </Row>
                <Submit disabled={this.state.submitted} />
                <ErrorPrompt visible={this.state.showError} />
                </form>
              
               
             </div>
        );


    }


}

export default RegistrationForm;