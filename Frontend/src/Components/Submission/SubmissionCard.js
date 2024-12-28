import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { BsCheckCircle, BsXCircle, BsClock, BsCpu, BsTerminal } from 'react-icons/bs';
import formatTimeElapsed from '../../Assets/Utils';

function SubmissionCard({ submission }) {

    return (
        <Card>
            <Card.Header className="text-center">
                <h3>Submission Details</h3>
                {/* submitted by */}
                <p>
                    <strong>Submitted By:</strong> {submission.email}
                </p>
            </Card.Header>
            <Card.Body>
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <td>
                                <BsTerminal className="me-2" />
                                Submitted
                            </td>
                            <td>{formatTimeElapsed(submission.created_at) || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>
                                <BsXCircle className="me-2" />
                                stderr
                            </td>
                            <td>{submission.stderr || 'No Errors'}</td>
                        </tr>
                        <tr>
                            <td>
                                <BsTerminal className="me-2" />
                                language_id
                            </td>
                            <td>{submission.language_id || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>
                                <BsClock className="me-2" />
                                Execution Time
                            </td>
                            <td>{submission.time || 'N/A'} seconds</td>
                        </tr>
                        <tr>
                            <td>
                                <BsCpu className="me-2" />
                                Memory Usage
                            </td>
                            <td>{submission.memory || 'N/A'} KB</td>
                        </tr>

                        <tr>
                            <td>
                                <BsCheckCircle className="me-2" />
                                Status
                            </td>
                            <td>{submission.status.description}</td>
                        </tr>
                        <tr>
                            <td>
                                <BsTerminal className="me-2" />
                                Message
                            </td>
                            <td>{submission.message || 'N/A'}</td>
                        </tr>
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}

export default SubmissionCard;