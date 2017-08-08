
import React from 'react'
import {render} from 'react-dom'
import ReactDom from 'react-dom'

import MerakiApi from './meraki_api'
import DropdownList from './components/dropdown_list.jsx'

import {Grid, Row, Col, Panel, Button, ControlLabel, Form, FormGroup, FormControl} from 'react-bootstrap'

export default class Deploy extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            organizations: [],
            selected_org: {},
            selected_org_templates: [],
            selected_template: {},
            network_prefix: "",
            network_qty: ""
        };

        this.select_org = this.select_org.bind(this);
        this.select_template = this.select_template.bind(this);
        this.update_network_prefix = this.update_network_prefix.bind(this);
        this.update_network_qty = this.update_network_qty.bind(this);
    }

    // get the orgs you have access to on initial load
    load_orgs() {
        this.props.api.get_organizations().then((organizations) => {
            this.setState({organizations: organizations});
        })
    }

    componentDidMount() {
        this.load_orgs();
    }

    componentWillUpdate() {
        this.load_orgs();
    }

    // event handling functions here
    select_org(org) {
        this.setState({
            selected_org: org, 
            selected_template: {},
            selected_org_templates: []
        });

        this.props.api.get_templates(org).then((templates) => {
            this.setState({selected_org_templates: templates})
        })
    }

    select_template(template) {
        this.setState({selected_template: template});
    }

    update_network_prefix(e) {
        this.setState({network_prefix: e.target.value});
    }

    update_network_qty(e) {
        this.setState({network_qty: e.target.value});
    }

    // ui building pieces here

    org_drop_down() {
        return (
            <span >
                <ControlLabel>Organization</ControlLabel>
                <DropdownList title={this.state.selected_org.name || "select an org"}
                    items={this.state.organizations}
                    cb={this.select_org}>
                </DropdownList>
            </span>
        )
    }

    template_drop_down() {
        return (
            <span>
                <ControlLabel>Template</ControlLabel>
                <DropdownList title={this.state.selected_template.name || "select a template"} 
                    items={this.state.selected_org_templates} 
                    cb={this.select_template}>
                </DropdownList>
            </span>
        )
    }

    network_prefix_textbox() {
        return (
                <FormGroup controlId="network_prefix_text">
                    <ControlLabel>Network name prefix</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.network_prefix}
                        placeholder="Enter a prefix for created network names"
                        onChange={this.update_network_prefix}
                    />
                </FormGroup>
        )
    }

    network_qty_textbox() {
        return (
            <FormGroup controlId="network_qty_text">
                    <ControlLabel>Network qty</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.network_qty}
                        placeholder="Enter how many networks to make"
                        onChange={this.update_network_qty}
                    />
                </FormGroup>
        )
    }

    config_panel() {
        return (
            <Panel header="Configure network maker">
                <Row className="pad-bottom">
                    <Col xs={6}>
                        {this.org_drop_down()}
                    </Col>
                    <Col xs={6}>
                        {this.template_drop_down()}
                    </Col>
                </Row>
                <Row className="pad-bottom">
                    <Col xs={6}>
                        {this.network_prefix_textbox()}
                    </Col>
                    <Col xs={6}>
                        {this.network_qty_textbox()}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className="text-center">
                        <Button bsStyle="success" bsSize="large" >Make and Bind</Button>
                    </Col>
                </Row>
            </Panel>
        )
    }

    // component render here
    render() {
        return (
            <div>
                <Grid>
                    <Row >
                        <Col xs={12} md={9} lg={6}>
                            {this.config_panel()}
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}