import React from 'react'
import {render} from 'react-dom'
import ReactDom from 'react-dom'

import {Navbar, Nav, NavItem} from 'react-bootstrap'

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
                    <Nav bsStyle="pills" >
                        <NavItem eventKey={1}>Deploy</NavItem>
                    </Nav>  
                    <Nav bsStyle="pills" >
                        <NavItem eventKey={2}>Reset</NavItem>
                    </Nav>  
                    <Nav bsStyle="pills" >
                        <NavItem eventKey={3}>Configure</NavItem>
                    </Nav>  
                </Navbar.Collapse>
            </Navbar>
        )
    }


}