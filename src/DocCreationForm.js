import React, { Component } from 'react'

import {Button, Icon, Row, Input, Col, ProgressBar} from 'react-materialize'

import Submit from './MicroComponents/Submit'

import ErrorPrompt from './MicroComponents/ErrorPrompt'

import InfiniteProgressBar from './MicroComponents/InfiniteProgressBar'
import CenteredContentGrid from './MicroComponents/CenteredContentGrid';
import Documents from './utils/Documents';


class DocCreationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            docName : "",
            checksum : "",
            submitted: false,
            showError : false,
            paused : false,
            fileName : "",
            documents : new Documents(this.props.instances.documents),
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({submitted : true});
        this.state.documents.create(this.state.docName, this.state.checksum).then((res) => {

            

        });

    }


    handleTextChange(e) {
        this.setState(
            {
                [e.target.name] : e.target.value,
            }
        );
    }

    handleUpload(e) {
        this.setState({paused : true, fileName : e.target.value});
        console.log(e.target.value);
        
        var formData  = new FormData();
        formData.append("file", e.target.files[0]);
        fetch('/api/computeChecksum', {
            method : 'POST',
            body : formData,
        }).then((res) =>{
           res.text().then((txt) => {this.setState({checksum : txt, paused : false})});
        });
    }

    render() {

       
        return (
            <CenteredContentGrid>
                 
                <form onSubmit={this.handleSubmit}>
                <InfiniteProgressBar visible={this.state.submitted} />
                <Row> 
                   <Input placeholder="Document label" label="Document label" name="docName" s={12} value={this.state.docName} onChange={this.handleTextChange} />
                </Row>
                <Row>
                    
                    <div className="file-field input-field">
                    <Col s={12}>
                    <div className="btn btn-large">
                        <span>File</span>
                        <input type="file" onChange={this.handleUpload}/>
                    </div>
                    <div className="file-path-wrapper">
                        <input class="file-path validate" type="text" value={this.state.fileName}/>
                    </div>
                    </Col>
                    </div>
                </Row>
                <Row>
                    <Input placeholder="Document checksum" label="Checksum" name="checksum" s={12} value={this.state.checksum} />
                </Row>
                <Submit disabled={this.state.submitted || this.state.paused} />
                <ErrorPrompt visible={this.state.showError} />
                </form>
               
             </CenteredContentGrid>
        );


    }


}

export default DocCreationForm;