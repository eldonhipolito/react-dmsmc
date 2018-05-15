import React, { Component } from 'react'

import {Col, Row} from 'react-materialize'

class CenteredContentGrid extends Component {

    render() {
      return (  <Row>
            <Col s={4} />
            <Col s={4}>
                {this.props.children}
            </Col>
            <Col s={4} />
        </Row>);
    }
}

export default CenteredContentGrid;