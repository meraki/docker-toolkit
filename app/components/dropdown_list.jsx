
import React from 'react'
import {render} from 'react-dom'
import ReactDom from 'react-dom'

import {ButtonGroup, DropdownButton, MenuItem} from 'react-bootstrap'

export default class DropdownList extends React.Component {

    constructor(props) {
        super(props);
    }

    as_menu_items(items,cb) {
        return items.map((item,i) => {
            return <MenuItem eventKey={i} key={i} onSelect={() => {cb(item)}}>{item.name}</MenuItem>
        })
    }

    render() {
        return <ButtonGroup justified>
            <DropdownButton bsStyle={this.props.bsStyle || "default"} title={this.props.title } id="0"> 
                {this.as_menu_items(this.props.items,this.props.cb)}
            </DropdownButton>
        </ButtonGroup>
    }

}