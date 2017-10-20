
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
                    <thead>
                        <tr><th>Displaying {this.props.logs.length} messages</th></tr>
                    </thead>
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
                <Grid>
                    <Row>
                        <Col xs={12} >
                            <Panel header={
                                <div>
                                    <span>logs</span>
                                    <Button onClick={this.props.on_clear_logs} className="pull-right">clear</Button>
                                </div>}>
                                {this.log_table()}
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
