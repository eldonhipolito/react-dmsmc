import React, { Component } from 'react'

import Identities from './utils/Identities'
import RoleEntry from './RoleEntry';


class RoleList extends Component {
    
   
    constructor(props){
        super(props);

        this.state = {
            list : [],
            identities : new Identities(this.props.instances.identities, this.props.templates.Identity),
        };

        this.parentHandler = this.parentHandler.bind(this);
    }
    componentDidMount() {

      this.state.identities.listVerified().then((result) => {
        this.setState({list : result});
      });
     
    }

    parentHandler(ndx, newIdn){
        let newList = [...this.state.list];
        newList[ndx] = newIdn;
        this.setState({list : newList});
    }


    render() {
        const items = this.state.list.map((entry, i) =>
        (
            <RoleEntry key = {i} ndx = {i} instances = {this.props.instances} 
            identities = {this.state.identities} parentHandler = {(ndx, newIdn) => this.parentHandler(ndx, newIdn)} 
            entry = {entry}/>
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