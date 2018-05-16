import React, { Component } from 'react'

import {Button} from 'react-materialize'
import RowEntryAction from '../RowEntryAction';


class RoleActions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            submitted : false,
        }
        this.handleAddRole = this.handleAddRole.bind(this);
    }

    handleAddRole(role){
        console.log(this.props.ndx);
        console.log(role);
    }

    render() {

        const actions = this.props.roles.map((entry, i) => (
           !entry.hasRole ? 
            <RowEntryAction key = {entry.role} value={entry.role} submitted={this.state.submitted} parentClicked={(param) => this.handleAddRole(param)}>
                Add {entry.role} role
            </RowEntryAction> : (null)

        ));
        console.log(actions);
        return (
            <div>
            {actions}
            </div>);
    }
}

export default RoleActions;