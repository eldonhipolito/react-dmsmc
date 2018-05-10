import React, { Component } from 'react'

import RegistrationForm from './RegistrationForm'

class DefaultContainer extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        const val = Object.keys(this.props.instances).length !== 0 ? this.props.instances.identities.address : "";
        return (
            <div id="registrationcontainer">
                <RegistrationForm />
            </div>
        );
    }


}

export default DefaultContainer;