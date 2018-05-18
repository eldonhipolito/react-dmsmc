import React, { Component } from 'react'

import {Row, Col, Card} from 'react-materialize'


class RegistrationCompleted extends Component {

    render() {

        return (
            <Row>
                <Col s={12}>
                    <Card className="blue-grey" textClassName="white-text" title="Identity">
                        <span className="white-text"> {this.props.args.address} </span>
                        <span className="white-text"> {this.props.args.txHash} </span>
                    </Card>
                </Col>
            </Row>

        );
    }
}

export default RegistrationCompleted;