import React from 'react'
import {render} from 'react-dom'
import ReactDom from 'react-dom'

import {Navbar, Nav, NavItem, Button, ToggleButtonGroup, ToggleButton} from 'react-bootstrap'

export default class NavHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar inverse staticTop>
                <Navbar.Brand>
                    <a href="">Meraki API</a>
                </Navbar.Brand>
                <Navbar.Toggle />

                <Navbar.Collapse className="pull-right">
                    <Navbar.Form>
                        <ToggleButtonGroup
                            type="checkbox"
                            value={this.props.selected_tools}
                            onChange={this.props.on_select_tools}
                        >
                            <ToggleButton value={"config"}>Configure</ToggleButton>
                            <ToggleButton value={"network_address_changer"}>Change addresses</ToggleButton>
                            <ToggleButton value={"network_maker"}>Make/bind networks</ToggleButton>
                            <ToggleButton value={"log_viewer"} >Show logs</ToggleButton>
                        </ToggleButtonGroup>
                    </Navbar.Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }


}