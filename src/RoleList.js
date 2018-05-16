import React, { Component } from 'react'

import Identities from './utils/Identities'
import RoleActions from './MicroComponents/RoleActions';


class RoleList extends Component {
    
   
    constructor(props){
        super(props);

        this.state = {
            list : [],
            submitted : false,
            identities : new Identities(this.props.instances.identities, this.props.templates.Identity),
        };
    }
    componentDidMount() {
        /*
        this.props.instances.identities.requestsCount.call().then((rqCount) => {
            for(let ndx = 0; ndx < rqCount; ndx++) {
               this.getIdentity(ndx, rqCount);
                
            }

        });
        */
      this.state.identities.listVerified().then((result) => {
          console.log(result);
        this.setState({list : result});
      });
     
    }

    formatRoles(roles){
        let strRoles = "";
        console.log(roles);
        for(let i = 0; i < roles.length; i++) {
            strRoles = roles[i].hasRole ? strRoles + "," + roles[i].role : strRoles;
        }
        return strRoles.substr(1, strRoles.length);
    }


    render() {
        const items = this.state.list.map((entry, i) =>
        (
        <tr key={i}>
            <td>{entry.userId}</td>
            <td>{entry.name}</td>
            <td>{entry.identity}</td>
            <td>{entry.userAddress}</td>
            <td>{this.formatRoles(entry.roles)} </td>
            <td> 
                <RoleActions ndx = {i} roles = {entry.roles} />
            </td>
        </tr>
        )
    );
        return(
            <table className="highlight centered responsive-table">
                <thead>
                    <tr>
                        <th data-field="username">Username</th>
                        <th data-field="name">Name</th>
                        <th data-field="identity">Identity</th>
                        <th data-field="publicAddress"> Public address </th>
                        <th> Roles </th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                   {items}
                </tbody>
            </table>

        );
    }
}

export default RoleList;