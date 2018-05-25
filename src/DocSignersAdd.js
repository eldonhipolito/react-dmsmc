import React, { Component } from 'react'

import {Collection, CollectionItem, Input, Row, Button} from 'react-materialize'


import Document from './utils/Document'
import Identities from './utils/Identities'

import Submit from './MicroComponents/Submit'
import InfiniteProgressBar from './MicroComponents/InfiniteProgressBar'
import ErrorPrompt from './MicroComponents/ErrorPrompt'
import SignerCollectionItem from './MicroComponents/SignerCollectionItem'

class DocSignersAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showError : false,
            document : new Document(this.props.templates.Document, this.props.args.document),
            identities : new Identities(this.props.instances.identities, this.props.templates.Identity),
            signers : [],
            addingSigner : false,
            loading : false,
            signerIdentities : [],
        }

        this.handleStep = this.handleStep.bind(this);
    }

    componentDidMount(){
        this.loadSigners();

    }

    componentWillReceiveProps(){
        console.log("received props")
        this.setState({
            showError : false,
            document : new Document(this.props.templates.Document, this.props.args.document),
            identities : new Identities(this.props.instances.identities, this.props.templates.Identity),
            signers : [],
            addingSigner : false,
            loading : false,
        });

        this.loadSigners();

    }

    loadSigners(){
        this.state.document.signerCount().then((count) => {
            this.state.document.signers(count).then((res) => {
                this.setState({signers : res});
    
                if(res !== undefined) {
                    this.setState({signers : []});
                    this.loadSignerDetails(res);
                }
            });
        });
    }

    loadSignerDetails(userAddresses){
        let promises = [];
        userAddresses.map((s) => {
            promises.push(this.state.identities.lookup(s));
        });
        
        Promise.all(promises).then((idns) => {
            this.setState({signerIdentities : idns});
        });
    }

    handleCollectionAdd(){
        this.setState({addingSigner : true});
    }

    handleStep(args){
        switch(args.action){
            case "add":
                this.addSigner(args.fieldValue);
                break;
            default:
                break;
        }
    }

    addSigner(userAddress){
        this.setState({loading : true});
        this.state.document.addSigner(userAddress).then((res) => {
            this.props.parentHandler(this.props.count + 1, {});
        }).catch((err) => {
            if(err.message.startsWith("Error: MetaMask Tx Signature: User denied transaction signature.")) {
                this.setState({submitted : false});
            } else {
               this.setState({showError : true});
            }
        });

    }



    render() {
        console.log(this.state.signers);
        const items = this.state.signerIdentities.map((s) =>  
        <SignerCollectionItem editable={false} parentHandler={((args) => this.handleStep(args))} identity={s} elementIcon="remove_circle_outline" action="remove"/>)

        const newItem = this.state.addingSigner ?
         <SignerCollectionItem editable={true} parentHandler={((args) => this.handleStep(args))} elementIcon="done" action="add"/> : <div></div>;

        return (
            <div>
                <Collection header='Authorized Signers' className="valign-wrapper">
                    {items}
                    {newItem}
                    <InfiniteProgressBar visible={this.state.loading}/>
                </Collection>
                <Button large disabled={this.state.addingSigner} onClick={(() => this.handleCollectionAdd())}> + Add Signer </Button>
                <ErrorPrompt visible={this.state.showError} />
            </div>
        );
    }
    
}

export default DocSignersAdd;