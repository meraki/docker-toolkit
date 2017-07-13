
import React from 'react'
import {render} from 'react-dom'
import ReactDom from 'react-dom'

import MerakiApi from './meraki_api'

import {DropdownButton, MenuItem, Button} from 'react-bootstrap'

export default class Deploy extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            organizations: [],
            selected_org: {},
            selected_org_templates: [],
            selected_template: {}
        };

        this.select_org = this.select_org.bind(this);
        this.select_template = this.select_template.bind(this);
        
    }

    componentDidMount() {
        this.props.api.get_organizations().then((organizations) => {
            console.dir(organizations)
            this.setState({organizations: organizations});
        })
    }

    select_org(org) {
        this.setState({
            selected_org: org, 
            selected_template: {}
        });

        this.props.api.get_templates(org).then((templates) => {
            this.setState({selected_org_templates: templates})
        })
    }

    select_template(template) {
        this.setState({selected_template: template});
    }

    orgs_as_menu_items() {
        return this.state.organizations.map((organization,i) => {
            return <MenuItem eventKey={i} key={i} onSelect={this.select_org.bind(this,organization)}>{organization.name}</MenuItem>
        })
    }

    templates_as_menu_items() {
        return this.state.selected_org_templates.map((template,i) => {
            return <MenuItem eventKey={i} key={i} onSelect={this.select_template.bind(this,template)}>{template.name}</MenuItem>
        })
    }

    render() {
        return (
            <div>
                <DropdownButton bsStyle="default" title={this.state.selected_org.name || "select an org"} id="0"> 
                    {this.orgs_as_menu_items()}                    
                </DropdownButton>
                <DropdownButton bsStyle="default" title={this.state.selected_template.name || "select a template"} id="1">
                    {this.templates_as_menu_items()}
                </DropdownButton>
                <Button bsStyle="primary">Click me</Button>
            </div>
        )
    }
}