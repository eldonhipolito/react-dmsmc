import React, { Component } from 'react'
import {MenuItem, Input, CollectionItem} from 'react-materialize'

class DocumentCollectionItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            docInfo : this.props.document,
        };
    }

    loadDocView(){
        this.props.loadDocView(this.state.docInfo.address);
        console.log(this.state.docInfo.address);
    }

    render(){
        return(
            <CollectionItem href='#' onClick={(() => this.loadDocView())}>
                <MenuItem> ID: {this.state.docInfo.id.c[0]}  Name: {this.state.docInfo.docName} </MenuItem> 
            </CollectionItem>
        );
    }
}

export default DocumentCollectionItem;