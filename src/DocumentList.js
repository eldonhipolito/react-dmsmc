import React, {Component} from 'react';
import getWeb3 from './utils/getWeb3';
import Documents from "./utils/Documents";
import {Collapsible, CollapsibleItem, MenuItem, Badge, Breadcrumb, Row, Collection} from 'react-materialize'
import DocumentCollectionItem from './MicroComponents/DocumentCollectionItem'
import DocView from './DocView'


class DocumentList extends Component {

    constructor(props){
        super(props);

        this.state = {
            documents : new Documents(this.props.instances.documents, this.props.templates.Document),
            ownedDocs : [],
            pendingDocs : [],
            signedDocs : [],
            pendingDetailedDocs : [],
            signedDetailedDocs : []

        }

    }

    componentDidMount(){
        this.loadOwnedDocs();
        this.loadDocsForSigning();        
     }

    loadOwnedDocs(){
        this.state.documents.loadOwnedDocDetails().then((res) => {
            this.setState({ownedDocs : res});
        });
    }

    loadDocsForSigning(){
        this.state.documents.loadDocForSigning(this.props.user).then((resMap) => {
            let signedDocs = [];
            let pendingDocs = [];
            resMap.map((res) => { ;
                if(res.signed == true) {
                    signedDocs.push(res.address);
                }else {
                    pendingDocs.push(res.address);
                }
            });

            this.setState({
                signedDocs : signedDocs,
                pendingDocs : pendingDocs
            });

        });
    }

    loadDetailedPendingDocs(){
        if(this.state.pendingDetailedDocs.length === 0){
            let promises = [];
            this.state.pendingDocs.map((address) => {
                promises.push(this.state.documents.loadDocDetails(address));
            });

            Promise.all(promises).then((res) => {
                this.setState({pendingDetailedDocs : res});
            });
        }
    }

    loadDetailedSignedDocs(){
        if(this.state.signedDetailedDocs.length === 0) {
            let promises = [];
            this.state.signedDocs.map((address) => {
                promises.push(this.state.documents.loadDocDetails(address));
            });

            Promise.all(promises).then((res) => {
                this.setState({signedDetailedDocs : res});
            });
        } 
    }

    loadDocView(address){
        this.props.loadDocument(address);
    }

    
    render(){
        let ownedHeader = <span> Owned Documents </span>;
        let pendingHeader = <span> Pending Documents </span>;
        let signedHeader = <span> Signed Documents </span>;

        const ownedDocElems = this.state.ownedDocs.map((ownedDoc) => <DocumentCollectionItem document={ownedDoc} loadDocView={(address) => this.loadDocView(address)} />)
        const pendingDocElems = this.state.pendingDetailedDocs.map((pendingDoc) => <DocumentCollectionItem document={pendingDoc} loadDocView={(address) => this.loadDocView(address)}/>)
        const signedDocElems = this.state.signedDetailedDocs.map((signedDoc) => <DocumentCollectionItem document={signedDoc} loadDocView={(address) => this.loadDocView(address)}/>)

        if(ownedDocElems.length > 0) {
            ownedHeader = <span> Owned Documents <Badge newIcon>{ownedDocElems.length}</Badge> </span>
        }

        if(this.state.pendingDocs.length > 0) {
            pendingHeader = <span> Pending Documents <Badge newIcon>{this.state.pendingDocs.length}</Badge> </span>
        }

        if(this.state.signedDocs.length > 0) {
            signedHeader = <span> Signed Documents <Badge newIcon>{this.state.signedDocs.length}</Badge> </span>
        }

        return(
            <div>
                <Row>
                    <Breadcrumb>
                        <MenuItem>Documents</MenuItem>
                    </Breadcrumb>
                </Row>
                <Row>
                    <Collapsible>
                        <CollapsibleItem header={ownedHeader} icon='filter_drama'>
                            <Collection>
                                {ownedDocElems}
                            </Collection>
                        </CollapsibleItem>
                        <CollapsibleItem header={pendingHeader} onClick={() => this.loadDetailedPendingDocs()} icon='place'>
                            <Collection>
                                {pendingDocElems}
                            </Collection>
                        </CollapsibleItem>
                        <CollapsibleItem header={signedHeader} onClick={() => this.loadDetailedSignedDocs()} icon='whatshot'>
                            <Collection>
                                {signedDocElems}
                            </Collection>
                        </CollapsibleItem>
                    </Collapsible>
                </Row>
            </div>
        );
    }

}

export default DocumentList;