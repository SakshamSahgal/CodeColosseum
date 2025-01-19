import React from 'react';
import { Container, Col } from 'react-bootstrap';
import SubmissionRow from './SubmissionCard';
import AlertBox from '../../Components/AlertBox';
import { Table } from 'react-bootstrap';

function SubmissionsContainer({ submissions, totalEntries, email }) {

    //this means it's still loading
    if (submissions === null) {
        return (
            <Container className="text-center">
                <h1 className="my-4">Loading Submissions...</h1>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </Container>
        );
    }
    return (
        <Container>
            <h1 className="my-4 text-center">Submissions ({totalEntries ? totalEntries : 0} Submissions Total)</h1>
            {submissions?.length > 0 ? (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Submitted</th>
                            <th>Language</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((submission) => (<SubmissionRow key={submission._id} submission={submission} email={email} />))}
                    </tbody>
                </Table>
            ) : (
                <AlertBox heading={"No Submissions Found"} message={"The user may dwell outside the database's reach or linger in silence, having yet to leave a trace."} />
            )}
        </Container>
    );
}

export default SubmissionsContainer;