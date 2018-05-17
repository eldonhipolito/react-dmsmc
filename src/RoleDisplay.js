import React, { Component } from 'react'

class RoleDisplay extends Component {

    formatRoles(roles){
        let strRoles = "";
        console.log(roles);
        for(let i = 0; i < roles.length; i++) {
            strRoles = roles[i].hasRole ? strRoles + "," + roles[i].role : strRoles;
        }
        return strRoles.substr(1, strRoles.length);
    }

    render() {
        return (
            <div>
            {this.formatRoles(this.props.roles)}
            </div>
        );
    }
}

export default RoleDisplay;