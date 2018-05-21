import React, { Component } from 'react'


import RegistrationForm from './RegistrationForm'
import RequestVerificationForm from './RequestVerificationForm'

import RegistrationCompleted from './RegistrationCompleted'


import FlowComponent from './MicroComponents/FlowComponent';

class RegistrationFlow extends Component {


render() {
    const steps = [
     {  flow : "Create",
        form : (RegistrationForm)
    },
    {  flow : "Verify",
    form : (RequestVerificationForm)
    },
    {  flow : "Completed",
        form : (RegistrationCompleted)
    }
    ];
    
    return (
        <FlowComponent steps = {steps} templates={this.props.templates} instances={this.props.instances} />
    );

}


}

export default RegistrationFlow;