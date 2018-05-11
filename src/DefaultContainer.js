import React, { Component } from 'react'

import RegistrationFlow from './RegistrationFlow'

class DefaultContainer extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        const val = Object.keys(this.props.instances).length !== 0 ? this.props.instances.identities.address : "";
        return (
            <div id="registrationcontainer">
                <RegistrationFlow templates = {this.props.templates} instances = {this.props.instances} />
            </div>
        );
    }


}

export default DefaultContainer;