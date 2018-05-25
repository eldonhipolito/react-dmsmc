import React, {Component} from 'react';
import getWeb3 from './utils/getWeb3';
import Documents from "./utils/Documents";


class DocumentView extends Component {

    constructor(props){
        super(props);

        this.state = {
            documents : new Documents(this.props.instances.documents, this.props.templates.Document),
            ownedDocsNdx : [],
            
        }

    }

    componentDidMount(){
        this.loadOwnedDocs();

        
     }

    loadOwnedDocs(){
        return this.state.documents.listOwnedDocsNdx(this.props.user).then((ndx) => {
            this.setState({ownedDocsNdx : ndx});
            console.log(ndx[0]);
            this.state.documents.listOwnedDoc(ndx[0]).then((result) => {
                console.log(result);
            });
        });
        

    }

    loadPendingDocs(){

    }


    render(){
        return(
            <div>Ito muna</div>

        );
    }

}

export default DocumentView;