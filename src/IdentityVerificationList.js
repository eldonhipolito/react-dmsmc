import React, { Component } from 'react'
import RowEntryAction from './RowEntryAction';

import Identities from './utils/Identities'
import {Icon} from 'react-materialize'



class IdentityVerificationList extends Component {

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
      this.state.identities.listUnverified().then((result) => {
        console.log(result);
        this.setState({list : result});
      });
     
    }
    /*
    getIdentity(ndx, rqCount) {
        this.props.instances.identities.singleVerRequest(ndx).then((res) => {
            let userAddress = res[0];
            let identity = res[1];
            let timestamp = res[2];
            
       this.props.templates.Identity.at(identity).then((inst) =>{
            inst.userId.call().then((userId) => {
                inst.name.call().then((name) => {
                    console.log(name);
                    this.setState(prevState => ({                        
                        list : [...prevState.list, {userId : userId, name : name, identity : identity, userAddress : userAddress, timestamp : timestamp}]
                     }));
                     if(ndx == rqCount - 1) {
                        this.setState({listCompleted : true});
                     }
                
                });
            });
       });
      });
    }
    */

    verifyClicked(ndx){
        let entry = this.state.list[ndx];

        this.props.instances.identities.verifyIdentity(entry.userAddress, entry.identity).then((result) => {
            console.log("Verified");
            let newList = [...this.state.list];
            newList.splice(ndx, 1);
            this.setState({
                list : newList,
                submitted : false
            });

        }).catch((err) => {
            console.log(err);
        });
    }



    render() {
        const items = this.state.list.map((entry, i) =>
            (
            <tr key={i}>
                <td>{entry.userId}</td>
                <td>{entry.name}</td>
                <td>{entry.identity}</td>
                <td>{entry.userAddress}</td>
                <td>{entry.timestamp.toUTCString()} </td>
                <td><RowEntryAction value={i} submitted={this.state.submitted} parentClicked={(param) => this.verifyClicked(param)}>
                        Verify<Icon left>verified_user</Icon>
                    </RowEntryAction>
                </td>
            </tr>
            )
        );
        console.log(items);
        return(
            <table className="highlight centered responsive-table">
                <thead>
                    <tr>
                        <th data-field="username">Username</th>
                        <th data-field="name">Name</th>
                        <th data-field="identity">Identity</th>
                        <th data-field="publicAddress"> Public address </th>
                        <th data-field="timestamp"> Date requested </th>
                        <th> Action </th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>

        );
    }
}

export default IdentityVerificationList;