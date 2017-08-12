import React from 'react'
import {render} from 'react-dom'
import ReactDom from 'react-dom'

import Deploy from './deploy.jsx'
import Config from './config.jsx'
import NetworkAdressChanger from './network_address_changer.jsx'

import MerakiApi from './meraki_api'
import NavHeader from './components/nav_header.jsx'


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            meraki_api: new MerakiApi
        }

        this.state.meraki_api.set_container_component(this);
    }

    render() {
        return (
            <div>
                <NavHeader />
                <Config api={this.state.meraki_api} />
                <NetworkAdressChanger api={this.state.meraki_api} />
                <Deploy api={this.state.meraki_api} />
            </div>
        )
    }
}

ReactDom.render(<App />, document.getElementById('app'));