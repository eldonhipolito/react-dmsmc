import React, { Component } from 'react'


import RegistrationForm from './RegistrationForm'
import RequestVerificationForm from './RequestVerificationForm'

import RegistrationCompleted from './RegistrationCompleted'

import CenteredContentGrid from './MicroComponents/CenteredContentGrid'

import {Button, Icon, Row, Input, Col, Breadcrumb, MenuItem} from 'react-materialize'

class RegistrationFlow extends Component {

constructor(props){
    super(props);

    this.state = {
        identityAddress : "",
        txHash : "",
        step : 1,
    }
}

completeRegistration(res) {
    this.setState({
        identityAddress : res,
        step : 2
    });
}

completeVerificationReq(res) {
    this.setState({
        txHash : res,
        step : 3
    });
}
currentForm() {
    switch(this.state.step) {
        case 1 :
        return (<RegistrationForm instances = {this.props.instances} templates = {this.props.templates} onRegistrationComplete={(param) => this.completeRegistration(param)} />);
        case 2:
        return  (<RequestVerificationForm instances = {this.props.instances} templates = {this.props.templates} identityAddress = {this.state.identityAddress} txHash = {this.state.txHash} onCompleteVerificationReq={(param) => this.completeVerificationReq(param)} />);
        case 3 : 
        return (<RegistrationCompleted txHash = {this.state.txHash} identityAddress = {this.state.identityAddress} />);
    }
}
render() {


    const flow = [<MenuItem key="registration"> Create </MenuItem>];

    if(this.state.step >= 2) {
        flow.push(<MenuItem key="reqVerification"> Verify </MenuItem>);
    }
    if(this.state.step == 3) {
        flow.push(<MenuItem key="completed"> Completed </MenuItem>)
    }
    return (
        <div>
            <CenteredContentGrid>
                    <Breadcrumb>
                    {flow}
                    </Breadcrumb>
            </CenteredContentGrid>
            <CenteredContentGrid>
                {this.currentForm()}
            </CenteredContentGrid>
        </div>
    );

}


}

export default RegistrationFlow;