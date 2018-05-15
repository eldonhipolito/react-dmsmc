import React, { Component } from 'react'

import {Col, Row, ProgressBar} from 'react-materialize'

class InfiniteProgressBar extends Component {

    render() {
       return  this.props.visible ? (<Row>
            <Col s={12}>
              <ProgressBar />
            </Col>
        </Row>) : (null);
    }
}

export default InfiniteProgressBar