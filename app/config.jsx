

import React from 'react'
import {render} from 'react-dom'
import ReactDom from 'react-dom'

import {Grid, Row, Col, Panel, Button, ControlLabel, Form, FormGroup, FormControl} from 'react-bootstrap'

export default class Config extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            api_key: props.api.get_api_key()
        }

        this.update_api_key = this.update_api_key.bind(this);
        this.save_api_key = this.save_api_key.bind(this);
    }

    save_api_key(e) {
        this.props.api.set_api_key(this.state.api_key);
    }

    update_api_key(e) {
        this.setState({api_key: e.target.value})
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

    config_panel() {
        return (
            <Panel header="Configure api key">
                <Row className="pad-bottom">
                    <Col xs={12}>
                        {this.api_key_textbox()}
                    </Col>
                </Row>
                <Row className="pad-bottom">
                    <Col xs={12} className="text-center">
                        <Button bsStyle="danger" bsSize="large" onClick={this.save_api_key}>Update</Button>
                    </Col>
                </Row>
            </Panel>
        )
    }

    render() {
        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs={12} >
                            {this.config_panel()}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

}