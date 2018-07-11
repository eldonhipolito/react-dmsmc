import React, { Component } from 'react'

import {Button, Icon, Col, Row} from 'react-materialize'


class Submit extends Component {

    render() {
        const text = this.props.text != null ? this.props.text : "Submit";
        return (
            <Row>
            <Col s={4}> </Col>
            <Button waves='light' large disabled={this.props.disabled}>{text}<Icon right>send</Icon></Button>
            </Row>
        );

    }

}

export default Submit;