import React, { Component } from 'react'

class RequestVerificationForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        
        this.props.instances.identities.reqIdnVerification(this.props.identityAddress).then((result) => {
            this.props.onCompleteVerificationReq(result.tx);
        });
    }


    render() {
        return (
                <div className="reqVerification-form">
                <form onSubmit={this.handleSubmit}>
                    <label> Identity address: </label>
                    <input type="text" name="identityAddress" value={this.props.identityAddress} />
                    <button type="submit"> Submit </button>
                </form>
              <h2> Tx request hash :  {this.props.txHash} </h2>
              </div>
        );


    }


}

export default RequestVerificationForm;