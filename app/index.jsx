import React from 'react'
import {render} from 'react-dom'
import ReactDom from 'react-dom'

import Deploy from './deploy.jsx'
import Config from './config.jsx'
import NetworkAdressChanger from './network_address_changer.jsx'

import MerakiApi from './meraki_api'
import NavHeader from './components/nav_header.jsx'
import LogViewer from './components/log_viewer.jsx'
import {Grid, Row} from 'react-bootstrap';


class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.clear_logs = this.clear_logs.bind(this);
        this.log = this.log.bind(this);
        this.update_selected_tools = this.update_selected_tools.bind(this);

        this.state = {
            meraki_api: new MerakiApi,
            logs: [],
            selected_tools: ["config","network_address_changer","log_viewer"],
            selectable_tools: [
                { component_name: "config", display_text: "Configure" },
                { component_name: "network_address_changer", display_text: "Change addresses" },
                { component_name: "log_viewer", display_text: "Show logs" }
                // { component_name: "network_maker", display_text: "Make/bind networks" }
            ]
        }
        
        this.state.meraki_api.set_container_component(this);
    }

    log(message) {
        this.setState({
            logs: this.state.logs.concat(message)
        })
    }

    clear_logs() {
        this.setState({
            logs: []
        })
    }

    update_selected_tools(selected_tools) {
        this.setState({
            selected_tools: selected_tools
        })
    }

    config_panel() {
        if (this.state.selected_tools.includes("config")) {
            return <Config api={this.state.meraki_api} />
        }
    }

    network_address_changer() {
        if (this.state.selected_tools.includes("network_address_changer")) {
            return <NetworkAdressChanger api={this.state.meraki_api} on_log={this.log} />
        }
    }

    log_viewer() {
        if (this.state.selected_tools.includes("log_viewer")) {
            return <LogViewer logs={this.state.logs} on_clear_logs={this.clear_logs} />
        }
    }

    network_maker() {
        if (this.state.selected_tools.includes("network_maker")) {
            return <Deploy api={this.state.meraki_api} />
        }
    }

    render() {
        return (
            <div>
                <NavHeader 
                    on_select_tools={this.update_selected_tools} 
                    selected_tools={this.state.selected_tools} 
                    selectable_tools={this.state.selectable_tools}    
                />
                <Grid>
                    {this.config_panel()}
                    {this.network_address_changer()}
                    { /*this.network_maker() */}
                    {this.log_viewer()}
                </Grid>
            </div>
        )
    }
}

ReactDom.render(<App />, document.getElementById('app'));