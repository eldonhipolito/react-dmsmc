import React, { Component } from 'react'

class RegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username : "",
            name : "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        
        this.props.templates.Identity.new(this.state.username, this.state.name).then((result) => {
            this.props.onRegistrationComplete(result.address);
        });
    }


    handleTextChange(e) {
        this.setState(
            {
                [e.target.name] : e.target.value,
            }
        );
    }

    render() {

        return (
                <div className="registration-form">
                <form onSubmit={this.handleSubmit}>
                    <label> Username: </label>
                        <input type="text" name="username" value={this.state.username} onChange={this.handleTextChange} />
                    <label> Name: </label>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleTextChange} />
                    <button type="submit"> Submit </button>
                </form>
              </div>
        );


    }


}

export default RegistrationForm;