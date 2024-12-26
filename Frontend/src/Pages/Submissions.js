import makeApiRequest from "../Assets/Apis";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Card, Container, Col, Row } from "react-bootstrap";
import formatTimeElapsed from "../Assets/Utils.js";
import SimpleNavbar from "../Components/Navbar.js";


function Submissions() {
  const { email } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [maxEntriesPerPage, setMaxEntriesPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    makeApiRequest({
      url: `/compiler/allSubmissions/${email}/${maxEntriesPerPage}/${currentPage}`,
      method: "GET",
      onSuccess: (data) => {
        setSubmissions(data);
      },
    });
  }, [email]);

  const redirectTosubmission = (submissionToken) => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    window.location.href = `/submission/${user.email}/${submissionToken}`;
  }

  return (
    <>
      <SimpleNavbar />
      <Container>
        <h1 className="my-4">Submissions</h1>
        {submissions.length > 0 ? (
          <Row xs={1} md={2} lg={3} className="g-4">
            {submissions.map((submission) => (
              <Col key={submission._id}>
                <Card
                  className="h-100 shadow-sm"
                  onClick={() => redirectTosubmission(submission.token)}
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Body>
                    <Card.Title className="text-primary">Submission Details</Card.Title>
                    <Card.Text>
                      <strong>Submitted:</strong> {formatTimeElapsed(submission.created_at)}
                    </Card.Text>
                    <Card.Text>
                      <strong>Language:</strong> {submission.language_name}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p>No submissions found.</p>
        )}
      </Container>
    </>
  );
}

export default Submissions;
