import React, { Component } from 'react'
import Identities from './utils/Identities'
import RoleActions from './MicroComponents/RoleActions';
import RoleDisplay from './RoleDisplay';

class RoleEntry extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submitted : false,
            idn : this.props.entry,
            roles : this.props.entry.roles,
        }
        this.parentHandler = this.parentHandler.bind(this);
    }

    parentHandler(ndx, role, roleIndex){
        let idn = this.props.entry;
        this.setState({submitted : true});
        this.props.instances.identities.adminAddRole(idn.userAddress, role).then((res) => {
            let newIdn = JSON.parse(JSON.stringify(this.state.idn));
                console.log("New IDN");
                newIdn.roles[roleIndex].hasRole = true;
                this.setState({idn : newIdn, submitted : false, roles : newIdn.roles});
                this.props.parentHandler(ndx, newIdn);
                //this.forceUpdate();
        }).catch((err) => {
            console.log(err);
        });
    }

    render (){
        console.log("State");
        console.log(this.state.roles);
        return (
        <tr key={this.props.ndx}>
            <td>{this.state.idn.userId}</td>
            <td>{this.state.idn.name}</td>
            <td>{this.state.idn.identity}</td>
            <td>{this.state.idn.userAddress}</td>
            <td><RoleDisplay roles = {this.state.roles} /> </td>
            <td> 
                <RoleActions submitted = {this.state.submitted} ndx = {this.props.ndx} roles = {this.state.idn.roles} parentHandler = {(ndx, role, roleIndex) => this.parentHandler(ndx, role, roleIndex)} />
            </td>
        </tr>
        );
    }

}

export default RoleEntry;