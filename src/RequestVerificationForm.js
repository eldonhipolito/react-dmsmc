import React, { Component } from 'react'

import {Button, Icon, Row, Input, Col} from 'react-materialize'

class RequestVerificationForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        
        this.props.instances.identities.reqIdnVerification(this.props.identityAddress).then((result) => {
            this.props.onCompleteVerificationReq(result.tx);
        });
    }


    render() {
        return (
                <div id="reqVerificationForm">
                <Row>
                <form onSubmit={this.handleSubmit}>

                    <Input label="Identity address" name="identityAddress" s={3} value={this.props.identityAddress} />
                    <Col s={3}> <Button waves='light'>Request Verification</Button> </Col>
                </form>
                </Row>
                <Row>
                 <h2> Tx request hash :  {this.props.txHash} </h2>
              </Row>
              </div>
        );


    }


}

export default RequestVerificationForm;