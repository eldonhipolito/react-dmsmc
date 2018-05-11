import React, { Component } from 'react'

import {Button, Icon, Row, Input, Col} from 'react-materialize'

class RegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username : "",
            name : "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        
        this.props.templates.Identity.new(this.state.username, this.state.name).then((result) => {
            this.props.onRegistrationComplete(result.address);
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
                <Row>  
                <form onSubmit={this.handleSubmit}>
                   <Input placeholder="Username" label="Username" name="username" s={6} value={this.state.username} onChange={this.handleTextChange} />
                   <Input placeholder="Name" label="Name" name="name" value={this.state.name} s={4} onChange={this.handleTextChange} />
                  <Col s={2}> <Button waves='light' large>Submit </Button> </Col>
                </form>
              </Row>
               
             </div>
        );


    }


}

export default RegistrationForm;