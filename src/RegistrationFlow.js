import React, { Component } from 'react'


import RegistrationForm from './RegistrationForm'
import RequestVerificationForm from './RequestVerificationForm'

import {Button, Icon, Row, Input, Col} from 'react-materialize'

class RegistrationFlow extends Component {

constructor(props){
    super(props);

    this.state = {
        identityAddress : "",
        txHash : "",
        step : "registration",
    }
}

completeRegistration(res) {
    this.setState({
        identityAddress : res,
        step : "reqVerification"
    });
}

completeVerificationReq(res) {
    this.setState({
        txHash : res
    });
}

render() {

    const curForm =  this.state.step === "registration" ? (<RegistrationForm instances = {this.props.instances} templates = {this.props.templates} onRegistrationComplete={(param) => this.completeRegistration(param)} />) : 
    (<RequestVerificationForm instances = {this.props.instances} templates = {this.props.templates} identityAddress = {this.state.identityAddress} txHash = {this.state.txHash} onCompleteVerificationReq={(param) => this.completeVerificationReq(param)} />);
    return (

        <Row>
            <Col s={3} />
            <Col s={6}>
                {curForm}
            </Col>
            <Col s={3} />
        </Row>
    );

}


}

export default RegistrationFlow;