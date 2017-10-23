

import React from 'react'
import {render} from 'react-dom'
import ReactDom from 'react-dom'

import {Grid, Row, Col, Panel, Button, ControlLabel, Form, FormGroup, FormControl} from 'react-bootstrap'

export default class Config extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            api_key: props.api.get_api_key(),
            api_key_changed: false
        }

        this.update_api_key = this.update_api_key.bind(this);
        this.save_api_key = this.save_api_key.bind(this);
    }

    save_api_key(e) {
        this.props.api.set_api_key(this.state.api_key);
        this.setState({
            api_key_changed: false
        })
    }

    update_api_key(e) {
        this.setState({
            api_key: e.target.value,
            api_key_changed: (e.target.value != this.props.api.get_api_key())
        })
    }

    api_key_textbox() {
        return (
            <FormGroup controlId="api_key_text">
                <ControlLabel>Api Key</ControlLabel>
                <FormControl
                    type="text"
                    value={this.state.api_key}
                    placeholder="Enter Api key"
                    onChange={this.update_api_key}
                />
            </FormGroup>
        )
    }

    api_key_save_button() {
        if (this.state.api_key_changed) {
            return (
                <Button bsStyle="danger" onClick={this.save_api_key}>Save key</Button>
            )
        } else {
            return (
                <Button bsStyle="success">Key saved</Button>
            )
        }
        
    }

    config_panel() {
        return (
            <Panel header="Configure API key">
                <Row className="pad-bottom">
                    <Col xs={12}>
                        {this.api_key_textbox()}
                    </Col>
                </Row>
                <Row className="pad-bottom">
                    <Col xs={12} className="text-center">
                        {this.api_key_save_button()}
                    </Col>
                </Row>
            </Panel>
        )
    }

    render() {
        return (
            <div>
                <Col xs={12} md={6}>
                    {this.config_panel()}
                </Col>
            </div>
        );
    }

}