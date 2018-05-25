import React, { Component } from 'react'
import {MenuItem, Input, CollectionItem, Button} from 'react-materialize'

class SignerCollectionItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fieldValue : "",
        }
    }

    handleButtonClick(){
        this.props.parentHandler({
            displayText : this.props.displayText,
            action : this.props.action,
            fieldValue : this.state.fieldValue
        });
    }

    handleTextChange(e){
        this.setState({
            fieldValue : e.target.value
        });
    }

    render(){
        const element = this.props.editable ? 
            <Input s={10} onChange={((e) => this.handleTextChange(e))}/> 
                : <MenuItem>UID: {this.props.identity.userId} Name: {this.props.identity.name}</MenuItem>;

        return(
            <CollectionItem className="valign-wrapper"> 
                {element}
                <Button flat className="secondary-content" icon={this.props.elementIcon} onClick={(() => this.handleButtonClick())} />
            </CollectionItem>
        );
    }
}

export default SignerCollectionItem;