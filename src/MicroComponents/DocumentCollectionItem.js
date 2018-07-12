import React, { Component } from 'react'
import {MenuItem, Input, CollectionItem} from 'react-materialize'

class DocumentCollectionItem extends Component {
    render(){
        return(
            <CollectionItem href="#">
                <MenuItem> ID: {this.props.document.id.c[0]}  Name: {this.props.document.docName} </MenuItem> 
            </CollectionItem>
        );
    }
}

export default DocumentCollectionItem;