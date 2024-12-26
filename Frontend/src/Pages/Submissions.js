import makeApiRequest from "../Assets/Apis";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Card, Container } from "react-bootstrap";
import formatTimeElapsed from "../Assets/Utils.js";
import SimpleNavbar from "../Components/Navbar.js";
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

  const redirectTosubmission = (submissionToken) => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    window.location.href = `/submission/${user.email}/${submissionToken}`;
  }

  return (
    <>
      <SimpleNavbar />
      <Container>
        <h1 className="my-4">Submissions</h1>
        {submissions.map((submission) => (
          <Card key={submission._id} className="mb-3" onClick={() => redirectTosubmission(submission.token)}>
            <Card.Body>
              <Card.Text>
                Submitted: {formatTimeElapsed(submission.created_at)}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </>
  );
}

export default Submissions;
