import makeApiRequest from "../Assets/Apis";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Card, Container } from "react-bootstrap";
import formatTimeElapsed from "../Assets/Utils.js";
function Submissions() {
    const { email } = useParams();
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
      makeApiRequest({
        url: `/compiler/allSubmissions/${email}`,
        method: "GET",
        onSuccess: (data) => {
          setSubmissions(data);
        },
      });
    }, [email]);

    return (
      <Container>
        <h1 className="my-4">Submissions</h1>
        {submissions.map((submission) => (
          <Card key={submission._id} className="mb-3">
            <Card.Body>
              <Card.Title>Language ID: {submission.language_id}</Card.Title>
              <Card.Text>
                Submitted: {formatTimeElapsed(submission.created_at)}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Container>
    );
  }

export default Submissions;
