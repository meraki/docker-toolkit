
import React from 'react'
import {render} from 'react-dom'
import ReactDom from 'react-dom'

import {Grid, Row, Col, Panel, Button, Table} from 'react-bootstrap'

export default class LogViewer extends React.Component {
    constructor(props) {
        super(props);
    }

    log_table() {
        return (
            <div className="log-table">
                <Table striped bordered condensed hover>
                    <tbody>
                        {this.props.logs.map((log,index) => {
                            return <tr key={index}><td>{log}</td></tr>
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Col xs={12} md={6} >
                    <Panel header={
                        <Row>
                            <Col xs={2}>
                                <span>Logs</span>
                            </Col>
                            <Col xs={6}>
                                <span>{this.props.logs.length} messages</span>
                            </Col>
                            <Col xs={4}>
                                <Button onClick={this.props.on_clear_logs} className="pull-right ">clear</Button>
                            </Col>
                        </Row>}>
                        {this.log_table()}
                    </Panel>
                </Col>
            </div>
        );
    }
}
