

import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { FaHome } from 'react-icons/fa';

function AdminAccessOnly() {
    return (
        <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-dark text-white">
            <Row className="text-center">
                <Col>
                    <h1 className="display-4 mb-4">This path is sealed for mortals—admin keys unlock the way.</h1>
                    <Button 
                        variant="outline-light" 
                        size="lg" 
                        className="d-flex align-items-center justify-content-center mx-auto"
                        onClick={() => window.location.href = '/'}
                    >
                        <FaHome className="me-2" /> Return Home
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminAccessOnly;