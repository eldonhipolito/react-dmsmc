import React, { Component } from 'react'
import Document from './utils/Document';

class DocView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            submitted : false,
            document : new Document(this.props.templates.Document, this.props.documentAddress),
            id : "",
            docName : "",
            checksum : "",
            signersCount : 0,
            signatures : 0,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        let userAddress = this.props.templates.web3Instance.eth.accounts[0];
        this.setState({submitted : true});
        this.state.document.sign(userAddress).then((res) => {
            console.log("Signed!!!");
            console.log(res);
            this.setState({submitted : false, signatures : res.totalSigned});
        });
    }

    componentDidMount(){
        this.state.document.val().then((val) => {
            this.setState({id : val.id, docName : val.docName, checksum : val.checksum, signersCount : val.signers.length, signatures : val.signatures.length});
        });
    }

    render(){
        return (
            <CenteredContentGrid>
                <form onSubmit={this.handleSubmit}>
                <InfiniteProgressBar visible={this.state.submitted} />
                <Row> 
                   <Input placeholder="Document ID" label="Document ID" name="id" s={12} value={this.state.id} disabled />
                </Row>
                <Row> 
                   <Input placeholder="Document label" label="Document label" name="docName" s={12} value={this.state.docName} disabled />
                </Row>
                <Row>
                    <Input placeholder="Document checksum" label="Checksum" name="checksum" s={12} value={this.state.checksum} disabled/>
                </Row>
                <Row>
                    <span> Signers count : {this.state.signersCount} </span>
                </Row>
                <Row>
                    <span> Signatures count : {this.state.signatures}/{this.state.signersCount} </span>
                </Row>
                <Submit text="Sign document" disabled={this.state.submitted} />
                <ErrorPrompt visible={this.state.showError} />
                </form>
             </CenteredContentGrid>
        );
    }



}

export default DocView;