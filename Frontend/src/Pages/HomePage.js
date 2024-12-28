// HomePage.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { GoogleAuth } from '../Assets/GoogleAuth.js';

function HomePage() {
    return (
        <div className="homepage" style={{ height: '100vh', backgroundColor: '#1c1c1e', color: '#f8f9fa' }}>
            <Container fluid className="d-flex justify-content-center align-items-center h-100">
                <Row className="text-center">
                    <Col>
                        {/* CodeColosseum Symbol */}
                        <div className="code-colosseum-symbol mb-4" style={{ fontSize: '3rem', lineHeight: 1 }}>
                            <div style={{ borderBottom: '4px solid #f8f9fa', width: '50px', margin: '0 auto' }}></div>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f8f9fa' }}></div>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f8f9fa' }}></div>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f8f9fa' }}></div>
                            </div>
                        </div>

                        <h1 className="mb-4" style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>
                            CodeColosseum
                        </h1>
                        <p className="mb-4" style={{ fontSize: '1.2rem' }}>
                            In the void of execution,<br />time and memory whisper your code's fate.
                        </p>
                        <div className="d-flex justify-content-center">
                            <GoogleAuth />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HomePage;
