import React, { Component } from 'react';
import {Row, Col, Navbar, NavItem, Dropdown} from 'react-materialize'
import DocumentList from './DocumentList';
import DocView from './DocView';


class Documents extends Component {
    constructor(props){
        super(props);

        this.state = {
            docViewAddress  : '',
            viewing : '',
        };
    }

    loadDocument(address){
        console.log(address)
        this.setState({
            docViewAddress : address,
            viewing : true,
        });
    }

    render(){
        console.log('document render');
        let document = this.state.viewing ? <DocView documentAddress={this.state.docViewAddress} templates={this.props.templates} /> : <div></div>
        
        return (
            <Row>
                <Col s={5}>
                    <DocumentList user={this.props.user} templates={this.props.templates} instances={this.props.instances} loadDocument={(address) => this.loadDocument(address)} />
                </Col>
                <Col s={1}/>
                <Col s={5} >
                <Row />
                <Row />
                <Row />
                <Row />
                
                    {document}
                </Col>
                <Col s={1}/>
            </Row>


        );
    }

} 

export default Documents;