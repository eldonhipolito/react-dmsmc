import React, { Component } from 'react'

import RowEntryAction from '../RowEntryAction';


class RoleActions extends Component {

    constructor(props) {
        super(props);

   
        this.handleAddRole = this.handleAddRole.bind(this);
    }

    handleAddRole(roleIndex){
        this.props.parentHandler(this.props.ndx, this.props.roles[roleIndex].role, roleIndex);
    }

    render() {

        const actions = this.props.roles.map((entry, i) => (
           !entry.hasRole ? 
            <RowEntryAction key = {entry.role} value={i} disabled={this.props.submitted} parentClicked={(param) => this.handleAddRole(param)}>
                Make {entry.role}
            </RowEntryAction> : (null)

        ));
        return (
            <div>
            {actions}
            </div>);
    }
}

export default RoleActions;