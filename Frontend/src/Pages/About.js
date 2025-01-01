import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import SimpleNavbar from "../Components/Navbar";
import makeApiRequest from '../Assets/Apis';


function About() {

  const [placeholder, setPlaceholder] = useState(null);

  useEffect(() => {
    makeApiRequest({
      url: '/placeholder/about',
      method: 'GET',
      onSuccess: (data) => {
        setPlaceholder(data[0]);
      },
    });
  }, []);

  return (
    <div>
      <SimpleNavbar />

      {/* About Section */}
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title className='bg-dark text-white'>CodeColosseum</Card.Title>
                <Card.Text>
                  {placeholder ? placeholder.description : 'Loading...'}
                </Card.Text>
                <Card.Text>
                  {placeholder ? placeholder.sub_description : 'Loading...'}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Creator Section */}
        <Row className="mt-5 justify-content-center">
          <Col md={8}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Created with 💓 by Saksham Sahgal</Card.Title>
                <div>
                  <Button
                    variant="link"
                    href={placeholder ? placeholder.ConnectWithMe.github : ''}
                    target="_blank"
                    className="mx-2"
                  >
                    <FaGithub size={25} />
                  </Button>
                  <Button
                    variant="link"
                    href={placeholder ? placeholder.ConnectWithMe.linkedIn : ''}
                    target="_blank"
                    className="mx-2"
                  >
                    <FaLinkedin size={25} />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default About;
