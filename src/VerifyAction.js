import React, { Component } from 'react'

import {Button, Icon} from 'react-materialize'


class VerifyAction extends Component {

    constructor(props) {
        super(props);

        this.props.verifyClicked = this.props.verifyClicked.bind(this);
    }

    clicked() {
        this.props.verifyClicked(this.props.value);
    }

    render() {
        return(
            <Button waves='light' onClick={this.clicked}>Verify<Icon left>verified_user</Icon></Button>
        );
    }

}

export default VerifyAction;