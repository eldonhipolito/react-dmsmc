import React, { Component } from 'react'
import VerifyAction from './VerifyAction';




class IdentityVerificationList extends Component {

    constructor(props){
        super(props);

        this.state = {
            list : [],
            selectedIndex : -1,
            listCompleted : false,
        };
    }
    componentDidMount() {
        this.props.instances.identities.requestsCount.call().then((rqCount) => {
            for(let ndx = 0; ndx < rqCount; ndx++) {
               this.getIdentity(ndx, rqCount);
                
            }

        });
    }

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

    verifyClicked(ndx){

    }



    render() {
        const items = this.state.list.map((entry, i) =>
            (
            <tr key={i}>
                <td>{entry.userId}</td>
                <td>{entry.name}</td>
                <td>{entry.identity}</td>
                <td>{entry.userAddress}</td>
                <td><VerifyAction value={i} verifyClicked={(param) => this.verifyClicked(param)} /></td>
            </tr>
            )
        );
        console.log(items);
        return(
            <table>
                <thead>
                    <tr>
                        <th data-field="username">Username</th>
                        <th data-field="name">Name</th>
                        <th data-field="identity">Identity</th>
                        <th data-field="publicAddress"> Public address </th>
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