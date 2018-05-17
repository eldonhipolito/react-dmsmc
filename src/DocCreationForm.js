import React, { Component } from 'react'

import {Button, Icon, Row, Input, Col, ProgressBar} from 'react-materialize'

import Submit from './MicroComponents/Submit'

import ErrorPrompt from './MicroComponents/ErrorPrompt'

import InfiniteProgressBar from './MicroComponents/InfiniteProgressBar'

class DocCreationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            docName : "",
            checksum : "",
            submitted: false,
            showError : false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        /*
        this.setState({submitted : true});
        this.props.templates.Identity.new(this.state.username, this.state.name).then((result) => {
            this.props.onRegistrationComplete(result.address);
        }).catch((err) => {
            if(err.message.startsWith("Error: MetaMask Tx Signature: User denied transaction signature.")) {
                this.setState({submitted : false});
            } else {
               this.setState({showError : true});
            }
        });
        */
    }


    handleTextChange(e) {
        this.setState(
            {
                [e.target.name] : e.target.value,
            }
        );
    }

    handleUpload(e) {
        console.log(e.target.value);
    }

    render() {

       
        return (
            <div id="docCreationForm">
                 
                <form onSubmit={this.handleSubmit}>
                <InfiniteProgressBar visible={this.state.submitted} />
                <Row> 
                   <Input placeholder="Document label" label="Document label" name="docName" s={12} value={this.state.docName} onChange={this.handleTextChange} />
                </Row>
                <Row>
                    <div className="file-field input-field">
                    <div className="btn">
                        <span>File</span>
                        <input type="file" onChange={this.handleUpload}/>
                    </div>
                    <div className="file-path-wrapper">
                        <Input placeholder="Document checksum" label="Checksum" name="checksum" s={12} value={this.state.checksum} />
                    </div>
                    </div>
                </Row>
                <Submit disabled={this.state.submitted} />
                <ErrorPrompt visible={this.state.showError} />
                </form>
              
               
             </div>
        );


    }


}

export default DocCreationForm;