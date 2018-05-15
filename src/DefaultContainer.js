import React, { Component } from 'react'

import RegistrationFlow from './RegistrationFlow'

import IdentityVerificationList from './IdentityVerificationList'

class DefaultContainer extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        const val = Object.keys(this.props.instances).length !== 0 ? this.props.instances.identities.address : "";
      //  <RegistrationFlow templates = {this.props.templates} instances = {this.props.instances} />
      
        return (
            <div id="registrationcontainer">
                <IdentityVerificationList templates = {this.props.templates} instances = {this.props.instances} />   
            </div>
        );
    }


}

export default DefaultContainer;