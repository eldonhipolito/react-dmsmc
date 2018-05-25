import React, { Component } from 'react'
import DocSignersAdd from './DocSignersAdd';
import {Row, Col, Navbar, NavItem} from 'react-materialize'


class NewDocSignersAdd extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            i : 0,
            args : [],
        }
    }

    handleResult(i, args){
        this.setState({
            i : i,
            args : args,
        });
    }

    
    render(){
        return(
        <div>
            <Row>
               <h5> ID : {this.props.args.id.c[0]}  </h5>
               <h5> Doc address : {this.props.args.document} </h5>
            </Row>
            <Row>
                <DocSignersAdd templates = {this.props.templates} instances = {this.props.instances} count={this.state.i} args={this.state.args} parentHandler={((i, args)=> this.handleResult(i, args))} args = {this.props.args}/>
            </Row>        
        </div>
        );
    }
}

export default NewDocSignersAdd;