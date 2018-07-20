import React, { Component } from 'react'

import RegistrationFlow from './RegistrationFlow'

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import {Row, Col, Navbar, NavItem, Dropdown} from 'react-materialize'

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import IdentityVerificationList from './IdentityVerificationList'

import RoleList from './RoleList'
import DocumentCreationFlow from './DocumentCreationFlow';
import DocumentList from './DocumentList';
import Authentication from './Authentication';
import Documents from './Documents';

class DefaultContainer extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            path : "/",
            authData : this.authCookiesData(),
        }
        this.handleRouting = this.handleRouting.bind(this);
    }

    authCookiesData(){
        const {cookies} = this.props;
        return {
                    authenticated : cookies.get("authenticated") || false,
                    userId : cookies.get("userId") || ""
                };
    }

    handleRouting(path) {
        this.setState({path : path});
    }

    authCallback(user) {
        const {cookies} = this.props;
        cookies.set('userId', user, {path: '/'});
        cookies.set('authenticated', true, {path:'/'});

        this.setState({authData : {authenticated : true, userId : user}, path : "/"});
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
            case "/authenticate":
            return (<Authentication templates={this.props.templates} instances={this.props.instances} authCallback={(user) => this.authCallback(user)} />);
            case "/documents" :
            return (<Documents user={this.props.user} templates={this.props.templates} instances={this.props.instances} /> )
            case "/":
            default:
            return this.state.authData.authenticated ? (<DocumentCreationFlow  templates={this.props.templates} instances={this.props.instances}  />)
             : (<Authentication templates={this.props.templates} instances={this.props.instances} authCallback={(user) => this.authCallback(user)} />);  

        }
    }

    chooseMenu(){
        if(this.state.authData.authenticated){
           return (
                <div>
                    <Navbar brand='Document management' right>
                        <NavItem onClick={() => this.handleRouting("/")} > Home </NavItem>
                        <Dropdown trigger={<NavItem>Document</NavItem>}>
                            <NavItem onClick={() => this.handleRouting("/createdoc")}>Create</NavItem>
                            <NavItem onClick={() => this.handleRouting("/documents")}>List</NavItem>
                        </Dropdown >
                        <Dropdown trigger={<NavItem>Account</NavItem>}>
                            <NavItem onClick={() => this.handleRouting("/verify")}> Verify </NavItem>
                            <NavItem onClick={() => this.handleRouting("/roles")}> Role list </NavItem>
                            <NavItem onClick={() => this.doSignout()}> Sign out </NavItem>
                        </Dropdown >
                    </Navbar>
                </div>
                );
        } else {
            return (
                <div>
                <Navbar brand='Document management' right>
                    <NavItem onClick={() => this.handleRouting("/authenticate")} > Sign in </NavItem>
                    <NavItem onClick={() => this.handleRouting("/register")}> Register </NavItem>
                </Navbar>
                </div>
            );
        }
    }

    doSignout(){
        const {cookies} = this.props;

        cookies.remove("authenticated");
        cookies.remove("userId");
        this.setState({authData : this.authCookiesData()});
        this.handleRouting("/authenticate");
     }


    render() {
        const menu = this.chooseMenu();
        return (
        <div className="defaultContainer">
            <Row>
                {menu}
            </Row>
           <Row>
               {this.choosePath()}
           </Row>   
       </div>
        );
    }


}

export default withCookies(DefaultContainer);