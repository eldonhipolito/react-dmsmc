import React, { Component } from 'react'
import DocSignersAdd from './DocSignersAdd';



class NewDocSignersAdd extends Component {
    

    

    
    render(){
        <div>
            <Row>
                <h3> ID : {this.props.args.id} </h3>
                <h3> Doc address : {this.props.args.document} </h3>
            </Row>
            <Row>
                <DocSignersAdd templates = {this.props.templates} instances = {this.props.instances} args = {this.props.args}/>
            </Row>        
        </div>
    }
}

export default NewDocSignersAdd;