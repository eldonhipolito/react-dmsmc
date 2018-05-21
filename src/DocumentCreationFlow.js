import React, { Component } from 'react'
import FlowComponent from './MicroComponents/FlowComponent';

import DocCreationForm from './DocCreationForm';

import NewDocSignersAdd from './NewDocSignersAdd';





class DocumentCreationFlow extends Component {


    render() {
        const steps = [
            {  flow : "Create",
               form : (DocCreationForm)
           },
           {  flow : "Add Signers",
           form : (NewDocSignersAdd)
           }
           ];

        return (<FlowComponent steps = {steps} templates={this.props.templates} instances={this.props.instances} />);
    }


}

export default DocumentCreationFlow;