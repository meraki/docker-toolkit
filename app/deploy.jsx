
import React from 'react'
import {render} from 'react-dom'
import ReactDom from 'react-dom'

import MerakiApi from './meraki_api'

export default class Deploy extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.api.get_organizations().then((response) => {
            return response.json()
        }).then((organizations) => {
            this.setState({organizations: organizations});
        })
    }

    render() {
        return (
            <div>herro{}</div>
        )
    }
}