import React from 'react'
import {render} from 'react-dom'
import ReactDom from 'react-dom'

import Deploy from './deploy.jsx'
import MerakiApi from './meraki_api'

class App extends React.Component {
    render() {
        return (
            <Deploy api={new MerakiApi} />
        );
    }
}

ReactDom.render(<App />, document.getElementById('app'));