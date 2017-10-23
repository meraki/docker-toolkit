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
                    <a href="">Meraki API toolbox</a>
                </Navbar.Brand>
                <Navbar.Toggle />

                <Navbar.Collapse className="pull-right">
                    <Navbar.Form>
                        <ToggleButtonGroup
                            type="checkbox"
                            value={this.props.selected_tools}
                            onChange={this.props.on_select_tools}
                        >
                            { this.props.selectable_tools.map((tool) => {
                                return <ToggleButton value={tool.component_name}>{tool.display_text}</ToggleButton>
                            })}
                        </ToggleButtonGroup>
                    </Navbar.Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }


}