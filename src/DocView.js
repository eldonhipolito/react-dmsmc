import React, { Component } from 'react'
import Document from './utils/Document';
import {Row, Input, Chip, Button, Col} from 'react-materialize';
import InfiniteProgressBar from './MicroComponents/InfiniteProgressBar';
import ErrorPrompt from './MicroComponents/ErrorPrompt';
import Submit from './MicroComponents/Submit';
import ReactTooltip from 'react-tooltip';

class DocView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            submitted : false,
            document : new Document(this.props.templates.Document, this.props.documentAddress, this.props.templates.web3Instance),
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
            this.setState({submitted : false, signatures : res.totalSigned});
        });
    }

    componentDidMount(){
        this.loadDetails();
    }

    componentDidUpdate(prevProps) {
        if(this.props.documentAddress !== prevProps.documentAddress){
            this.state.document.loadDoc(this.props.templates.Document, this.props.documentAddress);
            this.loadDetails();
        }
    }

    loadDetails(){
        this.state.document.val().then((val) => {
            this.setState({id : val.id.c[0], docName : val.docName, checksum : val.checksum, signersCount : val.signers.c[0], signatures : val.signatures.c[0]});
        });
    }

    render(){
        return (
            <Row>
                <form onSubmit={this.handleSubmit}>
                    <InfiniteProgressBar visible={this.state.submitted} />
                    <div className="section">
                        <h5>Document: {this.state.id}</h5>
                    </div>
                    <div className="divider" />
                    <Row> 
                        <Input placeholder="Document label" label="Document label" name="docName" s={12} value={this.state.docName} readOnly />
                    </Row>
                    <Row>
                        <Input placeholder="Document checksum" label="Checksum" name="checksum" s={12} value={this.state.checksum} readOnly/>
                    </Row>
                    <Row>
                        <Chip> Signer count : {this.state.signersCount} </Chip>
                        <Chip> Signature count : {this.state.signatures}/{this.state.signersCount} </Chip>
                    </Row>
                    <Row/>
                    <Row>
                        <Col s={1}/>
                        <Col s={2}>
                            <Button floating large className='green pulse' data-for='approve' data-tip='Approve' waves='light' icon='thumb_up' />
                            <ReactTooltip id='approve' place="bottom" type="dark" effect="solid"/>
                        </Col>
                        <Col s={2}>
                            <Button floating large className='red' data-for='disapprove' data-tip='Disapprove'  waves='light' icon='thumb_down' />
                            <ReactTooltip id='disapprove' place="bottom" type="dark" effect="solid"/>
                        </Col>
                        <Col s={2}>
                            <Button floating large className='blue' data-for='transfer-ownership' data-tip='Transfer Ownership' waves='light' icon='swap_horiz' />
                            <ReactTooltip id='transfer-ownership' place="bottom" type="dark" effect="solid"/>
                        </Col>
                        <Col s={2}>
                            <Button floating large className='violet' data-for='verify-document' data-tip='Verify Document' waves='light' icon='perm_media' />
                            <ReactTooltip id='verify-document' place="bottom" type="dark" effect="solid"/>
                        </Col>
                        <Col s={2}>
                            <Button floating large className='orange' data-for='download' data-tip='Download'  waves='light' icon='save_alt' />
                            <ReactTooltip id='download' place="bottom" type="dark" effect="solid"/>
                        </Col>
                    </Row>
                    <ErrorPrompt visible={this.state.showError} />
                </form>
             </Row>
        );
    }



}

export default DocView;