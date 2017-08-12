
//react
import React from 'react'
import {render} from 'react-dom'
import ReactDom from 'react-dom'

//bootstrap
import {Grid, Row, Col, Panel, Button, ControlLabel, Form, FormGroup, FormControl} from 'react-bootstrap'

//custom
import DropdownList from './dropdown_list.jsx'

export default class NetworkSelector extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            networks: [],
            selected_network: {},
            old_organization: this.props.organization
        }
        
        this.select_network = this.select_network.bind(this);
    }

    // lifecycle stuff
    load_networks() {
        this.props.api.get_networks(this.props.organization).then((networks) => {
            this.setState({networks: networks});
        })
    }

    componentDidMount() {
    }


    componentDidUpdate(prev_props) {
        //if the org changed load the new networks
        if (JSON.stringify(this.props.organization) !== JSON.stringify(prev_props.organization)) {
            this.load_networks();
        }
    }

    //event handlers
    select_network(network) {
        this.setState({
            selected_network: network, 
        });

        this.props.onSelect(network);
    }

    render() {
        return (
            <span >
                <ControlLabel>Network</ControlLabel>
                <DropdownList title={this.state.selected_network.name || "select a network"}
                    items={this.state.networks}
                    cb={this.select_network}>
                </DropdownList>
            </span>
        )
    }

}