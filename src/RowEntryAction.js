import React, { Component } from 'react'

import {Button} from 'react-materialize'


class RowEntryAction extends Component {

    constructor(props) {
        super(props);

        this.clicked = this.clicked.bind(this);
    }

    clicked() {
        this.props.parentClicked(this.props.value);
    }

    render() {
        return(
            <Button waves='light' disabled={this.props.submitted} onClick={this.clicked}>
                {this.props.children}
            </Button>
        );
    }

}

export default RowEntryAction;