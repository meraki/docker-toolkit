
import React from 'react'
import {render} from 'react-dom'
import ReactDom from 'react-dom'

import {Grid, Row, Col, Panel, Button, ControlLabel, Form, FormGroup, FormControl, Checkbox} from 'react-bootstrap'

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
            address_text: "",
            move_map_marker: false,
            update_notes: false
        }

        this.select_org = this.select_org.bind(this);
        this.select_network = this.select_network.bind(this);
        this.update_address_text = this.update_address_text.bind(this);
        this.update_device_addresses = this.update_device_addresses.bind(this);
        this.toggle_move_map_marker = this.toggle_move_map_marker.bind(this);
        this.toggle_update_notes = this.toggle_update_notes.bind(this);
        this.test_logging = this.test_logging.bind(this);
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
            if (this.state.move_map_marker) {
                device.moveMapMarker = "true";
            }

            if (this.state.update_notes) {
                device.notes = this.state.address_text;
            }
            
            device.address = this.state.address_text;

            delete device["lat"];
            delete device["lng"];

            this.props.api.update_device(device).then((device) => {
                if (device.name) {
                    this.props.on_log(device.name + " address updated");
                } else {
                    this.props.on_log(device.mac + " address updated");
                }
                
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
            <Button bsStyle="success" onClick={this.update_device_addresses}>Update {this.state.devices.length} devices</Button>
        )
    }

    test_logging() {
        this.props.api.test_log("here's a test log");
    }

    test_button() {
        return (
            <Button bsStyle="danger" onClick={this.test_logging}>Test stuff </Button>
        )
    }

    toggle_move_map_marker() {
        this.setState({
            move_map_marker: !this.state.move_map_marker
        })
    }

    toggle_update_notes() {
        this.setState({
            update_notes: !this.state.update_notes
        })
    }

    network_address_change_panel() {
        return (
            <Panel header="Change addresses">
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
                    <Col xs={6}>
                        <Checkbox onClick={this.toggle_move_map_marker}>Move AP on map</Checkbox>
                        <Checkbox onClick={this.toggle_update_notes}>Put address in notes field</Checkbox>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className="text-center vertical-align">
                        {this.update_address_button()}
                        {/* this.test_button() */}
                    </Col>
                </Row>
            </Panel>
        )
    }

    render() {
        return (
            <Col xs={12} md={6} >
                {this.network_address_change_panel()}
            </Col>
        )
    }

}