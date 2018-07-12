import React, {Component} from 'react';
import getWeb3 from './utils/getWeb3';
import Documents from "./utils/Documents";
import {Collapsible, CollapsibleItem, MenuItem, Badge, Breadcrumb, Row, Collection} from 'react-materialize'
import DocumentCollectionItem from './MicroComponents/DocumentCollectionItem'
import CenteredContentGrid from  './MicroComponents/CenteredContentGrid'


class DocumentList extends Component {

    constructor(props){
        super(props);

        this.state = {
            documents : new Documents(this.props.instances.documents, this.props.templates.Document),
            ownedDocs : [],
            pendingDocs : [],
            signedDocs : [],
        }

    }

    componentDidMount(){
        this.loadOwnedDocs();
        this.loadPendingDocs();
        this.loadSignedDocs();
        
     }

    loadOwnedDocs(){
        console.log("owned");
        this.state.documents.loadOwnedDocDetails().then((res) => {
            console.log(res);
            this.setState({ownedDocs : res});
        });
    }

    loadPendingDocs(){
        this.state.documents.loadDocForSigningDetails(this.props.user, false).then((res) => {
            console.log("owned " + res)
            this.setState({pendingDocs : res});
        });
    }

    loadSignedDocs(){
        this.state.documents.loadDocForSigningDetails(this.props.user, true).then((res) => {
            this.setState({signedDocs : res});
        });
    }

    
    render(){
        let ownedHeader = <span> Owned Documents </span>;
        let pendingHeader = <span> Pending Documents </span>;
        let signedHeader = <span> Signed Documents </span>;

        const ownedDocElems = this.state.ownedDocs.map((ownedDoc) => <DocumentCollectionItem document={ownedDoc}/>)
        const pendingDocElems = this.state.pendingDocs.map((pendingDoc) => <DocumentCollectionItem document={pendingDoc}/>)
        const signedDocElems = this.state.signedDocs.map((signedDoc) => <DocumentCollectionItem document={signedDoc}/>)

        if(ownedDocElems.length > 0) {
            ownedHeader = <span> Owned Documents <Badge newIcon>{ownedDocElems.length}</Badge> </span>
        }

        if(pendingDocElems.length > 0) {
            pendingHeader = <span> Pending Documents <Badge newIcon>{pendingDocElems.length}</Badge> </span>
        }

        if(signedDocElems.length > 0) {
            signedHeader = <span> Signed Documents <Badge newIcon>{signedDocElems.length}</Badge> </span>
        }

        return(
            <CenteredContentGrid>
                <Row>
                    <Breadcrumb>
                        <MenuItem>Documents</MenuItem>
                    </Breadcrumb>
                </Row>
                <Row>
                    <Collapsible defaultActiveKey={0}>
                        <CollapsibleItem header={ownedHeader} icon='filter_drama'>
                            <Collection>
                                {ownedDocElems}
                            </Collection>
                        </CollapsibleItem>
                        <CollapsibleItem header={pendingHeader} icon='place'>
                            <Collection>
                                {pendingDocElems}
                            </Collection>
                        </CollapsibleItem>
                        <CollapsibleItem header={signedHeader} icon='whatshot'>
                            <Collection>
                                {signedDocElems}
                            </Collection>
                        </CollapsibleItem>
                    </Collapsible>
                </Row>
            </CenteredContentGrid>
        );
    }

}

export default DocumentList;