import React, { Component } from 'react'

import {Col, Row} from 'react-materialize'


class ErrorPrompt extends Component {

    
    render() {
        return this.props.visible ? (<Row>
            <Col s={12}>
              <div className='card-panel red'>
                    <span className="white-text"> Error processing request. </span>
              </div>
            </Col>
        </Row>) : (null);
    }

}

export default ErrorPrompt