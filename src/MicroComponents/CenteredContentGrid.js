import React, { Component } from 'react'

import {Col, Row} from 'react-materialize'

class CenteredContentGrid extends Component {

    render() {
      return (  <Row>
            <Col s={3} />
            <Col s={6}>
                {this.props.children}
            </Col>
            <Col s={3} />
        </Row>);
    }
}

export default CenteredContentGrid;