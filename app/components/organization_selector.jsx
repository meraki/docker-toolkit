
//react
import React from 'react'
import {render} from 'react-dom'
import ReactDom from 'react-dom'

//bootstrap
import {Grid, Row, Col, Panel, Button, ControlLabel, Form, FormGroup, FormControl} from 'react-bootstrap'

//custom
import DropdownList from './dropdown_list.jsx'

export default class OrganizationSelector extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            organizations: [],
            selected_org: {},
            api_key: this.props.api.get_api_key()
        }

        this.select_org = this.select_org.bind(this);
    }

    // lifecycle stuff
    load_orgs() {
        this.props.api.get_organizations().then((organizations) => {
            this.setState({
                organizations: organizations,
                api_key: this.props.api.get_api_key()
            });
        })
    }

    componentDidMount() {
        this.load_orgs();
    }

    componentDidUpdate(prev_props,prev_state) {
        if (prev_state.api_key != this.props.api.get_api_key()) {
            this.load_orgs();
        }
    }

    //event handlers
    select_org(org) {
        this.setState({
            selected_org: org 
        });

        this.props.onSelect(org);
    }

    render() {
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

}