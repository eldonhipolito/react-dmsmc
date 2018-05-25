import React, { Component } from 'react'

import RegistrationFlow from './RegistrationFlow'

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import {Row, Col, Navbar, NavItem, Dropdown} from 'react-materialize'

import IdentityVerificationList from './IdentityVerificationList'

import RoleList from './RoleList'
import DocumentCreationFlow from './DocumentCreationFlow';
import DocumentView from './DocumentView';

class DefaultContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            path : "/",
        }
        this.handleRouting = this.handleRouting.bind(this);
        this.remoteCall = this.remoteCall.bind(this);
    }

    remoteCall(){
        fetch('/api/hello').then((res) => {

        });
    }

    handleRouting(path) {
        this.setState({path : path});
    }

    choosePath() {
        switch(this.state.path) {
            case "/createdoc" : 
            return (<DocumentCreationFlow  templates={this.props.templates} instances={this.props.instances}  />);
            case "/register" :
            return (<RegistrationFlow templates={this.props.templates} instances={this.props.instances}  />);
            case "/verify" : 
            return (<IdentityVerificationList templates={this.props.templates} instances={this.props.instances} />);
            case "/roles" : 
            return (<RoleList  templates={this.props.templates} instances={this.props.instances} />);

            default:
            return (<DocumentView  user={this.props.user} templates={this.props.templates} instances={this.props.instances}  />);
        }
    }


    render() {
      //  <RegistrationFlow templates = {this.props.templates} instances = {this.props.instances} />
      //     <IdentityVerificationList templates = {this.props.templates} instances = {this.props.instances} />   
           // <RoleList templates = {this.props.templates} instances = {this.props.instances} />  
 
        return (
            /*
            <Router>
                <div className="defaultContainer">
                    <Row>
                        <Col s={12}>
                            <Navbar brand='Document management' right>
                                <NavItem href='/'> Home </NavItem>
                                <NavItem href='/register'> Register </NavItem>
                                <NavItem href='/verify'> Verify </NavItem>
                                <NavItem href='/roles'> Role list </NavItem>
                            </Navbar>
                        </Col>
                    </Row>
                    <Row>
                        <Route exact path="/" render={(props) => <DocCreationForm {...props} templates = {this.props.templates} instances = {this.props.instances} /> } />
                        <Route path="/verify" render={(props) => <IdentityVerificationList {...props} templates = {this.props.templates} instances = {this.props.instances} /> } />
                        <Route path="/register" render={(props) => <RegistrationFlow {...props} templates = {this.props.templates} instances = {this.props.instances} /> } />
                        <Route path="/roles" render={(props) => <RoleList {...props} templates = {this.props.templates} instances = {this.props.instances} /> } />
                    </Row>   
                </div>
            </Router>
            */

        <div className="defaultContainer">
           <Row>
               <Col s={12}>
                   <Navbar brand='Document management' right>
                       <NavItem onClick={() => this.handleRouting("/")} > Home </NavItem>
                       <NavItem onClick={() => this.handleRouting("/createdoc")}>Create Docs</NavItem>
                       <NavItem onClick={() => this.handleRouting("/register")}> Register </NavItem>
                       <NavItem onClick={() => this.handleRouting("/verify")}> Verify </NavItem>
                       <NavItem onClick={() => this.handleRouting("/roles")}> Role list </NavItem>
                   </Navbar>
               </Col>
           </Row>
           <Row>
               {this.choosePath()}
           </Row>   
       </div>
        );
    }


}

export default DefaultContainer;