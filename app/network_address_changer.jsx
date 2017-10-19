
import React from 'react'
import {render} from 'react-dom'
import ReactDom from 'react-dom'

import {Grid, Row, Col, Panel, Button, ControlLabel, Form, FormGroup, FormControl} from 'react-bootstrap'

import DropdownList from './components/dropdown_list.jsx'
import OrganizationSelector from './components/organization_selector.jsx'
import NetworkSelector from './components/network_selector.jsx'

export default class NetworkAddressChanger extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            selected_org: {},
            selected_network: {},
            devices: [],
            address_text: ""
        }

        this.select_org = this.select_org.bind(this);
        this.select_network = this.select_network.bind(this);
        this.update_address_text = this.update_address_text.bind(this);
        this.update_device_addresses = this.update_device_addresses.bind(this);
    }

    //event handlers
    select_org(org) {
        this.setState({
            selected_org: org 
        });
    }

    select_network(network) {
        this.setState({
            selected_network: network
        });

        this.props.api.get_devices(network).then((devices) => {
            this.setState({
                devices: devices
            })
        });
    }

    update_address_text(e) {
        this.setState({
            address_text: e.target.value
        })
    }

    update_device_addresses() {
        let new_devices = this.state.devices.map((device) => {
            device.address = this.state.address_text;
            device.moveMapMarker = "true";
            device.tags = " api ";
            delete device["lat"];
            delete device["lng"];
            this.props.api.update_device(device).then((device) => {
                return device;
            });
        })
    }

    // ui building blocks here
    address_textbox() {
        return (
                <FormGroup controlId="address_text">
                    <ControlLabel>New address</ControlLabel>
                    <FormControl
                        componentClass="textarea"
                        value={this.state.address_text}
                        placeholder="Enter a new address"
                        onChange={this.update_address_text}
                    />
                </FormGroup>
        )
    }

    update_address_button() {
        return (
            <Button bsStyle="success" onClick={this.update_device_addresses}>Update network address</Button>
        )
    }

    log_stuff() {
        console.log("start");
        setTimeout(() => {
            console.log("stop");
        },3000.123);
    }

    test_button() {
        return (
            <Button bsStyle="danger" onClick={this.log_stuff}>Test stuff </Button>
        )
    }

    network_address_change_panel() {
        return (
            <Panel header="Address changer">
                <Row className="pad-bottom">
                    <Col xs={6}>
                        <OrganizationSelector api={this.props.api} onSelect={this.select_org} />
                    </Col>
                    <Col xs={6}>
                        <NetworkSelector api={this.props.api} organization={this.state.selected_org} onSelect={this.select_network} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        {this.address_textbox()}
                    </Col>
                    <Col xs={6} className="text-center vertical-align">
                        {this.update_address_button()}
                    </Col>
                    <Col xs={6} className="text-center vertical-align">
                        {this.test_button()}
                    </Col>
                </Row>
            </Panel>
        )
    }

    render() {
        return (
            <Grid>
                <Row >
                    <Col xs={12} md={9} lg={6}>
                        {this.network_address_change_panel()}
                    </Col>
                </Row>
            </Grid>
        )
    }

}