import React, { Component } from 'react'

import {Collection, CollectionItem, Input} from 'react-materialize'


import Document from './utils/Document'
import Identities from './utils/Identities'

import Submit from './MicroComponents/Submit'

import InfiniteProgressBar from './MicroComponents/InfiniteProgressBar'

class DocSignersAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            document : new Document(this.props.args.document),
            identities : new Identities(this.props.instances.identities, this.props.templates.Identity),
            signers : [],
        }
    }

    componentDidMount(){
        this.state.document.signers().then((res) => {
            this.setState({signers : res});
        });
    }

    formatIdentity(userAddress){
        let idn = this.state.identities.lookup(s);

        return "UID : " + idn.userId + ", Name : " + idn.name;
    }

    render() {
        const items = this.state.signers.map((s) => <CollectionItem> {
            this.formatIdentity(s)
        } </CollectionItem>
    );        
        return (
            <div>
            <Collection>
                {items}
            </Collection>
            <Row>
                
            </Row>
            </div>
        );
    }
    
}

export default DocSignersAdd;