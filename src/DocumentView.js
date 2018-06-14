import React, {Component} from 'react';
import getWeb3 from './utils/getWeb3';
import Documents from "./utils/Documents";


class DocumentView extends Component {

    constructor(props){
        super(props);

        this.state = {
            documents : new Documents(this.props.instances.documents, this.props.templates.Document),
            ownedDocs : [],
            pendingDocs : [],
        }

    }

    componentDidMount(){
        this.loadOwnedDocs();
        this.loadPendingDocs();
        
     }

    loadOwnedDocs(){
        console.log("owned");
        this.state.documents.loadOwnedDocDetails().then((res) => {
            console.log(res);
            this.setState({ownedDocs : res});
        });
    }

    loadPendingDocs(){
        console.log("pending");
        this.state.documents.loadSignedDocumentDetails(this.props.user).then((res) => {
            console.log(res);
            this.setState({pendingDocs : res});
        });
    }


    render(){
        return(
            <div>Ito muna</div>

        );
    }

}

export default DocumentView;