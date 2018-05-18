import React, { Component } from 'react'

import {Breadcrumb, MenuItem} from 'react-materialize'

import CenteredContentGrid from './CenteredContentGrid';

class FlowComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            i : 0,
            args : {},
        }

        this.handleStep = this.handleStep.bind(this);
    }
    handleStep(stepIndex, args) {
        if((stepIndex + 1) < this.props.steps.length) {
            this.setState({i : stepIndex + 1, args : args});
        }
    }

    populateFlow() {
        let flowList = [];
        for(let i = 0; i <= this.state.i; i++) {
            flowList.push(<MenuItem key={this.props.steps[i].flow}> {this.props.steps[i].flow} </MenuItem>);
        }

        return flowList;
    }

    render() {
        const CurrentForm = this.props.steps[this.state.i].form;
        
        const flowDisplay = this.populateFlow();
      console.log(flowDisplay);
        return (
        <div>
            <CenteredContentGrid>
                    <Breadcrumb>
                        {flowDisplay}
                    </Breadcrumb>
            </CenteredContentGrid>
            <CenteredContentGrid>
                <CurrentForm instances={this.props.instances} templates={this.props.templates} stepNum={this.state.i} args={this.state.args} parentHandler={((i, args) => this.handleStep(i, args))} />
            </CenteredContentGrid>
        </div>
        );
    }
    
}

export default FlowComponent;