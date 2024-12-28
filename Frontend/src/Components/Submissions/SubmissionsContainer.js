import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import SubmissionCard from './SubmissionCard';


function SubmissionsContainer({ submissions, totalEntries }) {

    //this means it's still loading
    if(submissions === null) {
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
                <Row xs={1} md={2} lg={3} className="g-4">
                    {submissions.map((submission) => (
                        <Col key={submission._id}>
                            <SubmissionCard submission={submission} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <Alert variant="warning" className="text-center shadow-sm p-4 mt-4">
                    <h4 className="mb-3">No Submissions Found</h4>
                    <p>
                        The user may dwell outside the database's reach or linger in silence,
                        having yet to leave a trace.
                    </p>
                </Alert>
            )}
        </Container>
    );
}

export default SubmissionsContainer;