import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import makeApiRequest from '../Assets/Apis';
import { Card, Table, Spinner } from 'react-bootstrap';
import { BsCheckCircle, BsXCircle, BsClock, BsCpu, BsTerminal } from 'react-icons/bs';
import SimpleNavbar from '../Components/Navbar';
import CodeMirror from '@uiw/react-codemirror';

function Submission() {
  const { submissionToken, email } = useParams();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    makeApiRequest({
      url: `/compiler/submission/${email}/${submissionToken}`,
      method: 'GET',
      onSuccess: (data) => {
        setSubmission(data);
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      },
    });
  }, [submissionToken]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <SimpleNavbar />
      <div className="container mt-5">
        <Card>
          <Card.Header className="text-center">
            <h3>Submission Details</h3>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>
                    <BsTerminal className="me-2" />
                    Output
                  </td>
                  <td>{submission.stdout || 'N/A'}</td>
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
                    <BsXCircle className="me-2" />
                    Error Output
                  </td>
                  <td>{submission.stderr || 'No Errors'}</td>
                </tr>
                <tr>
                  <td>
                    <BsCheckCircle className="me-2" />
                    Status
                  </td>
                  <td>{submission.status.description}</td>
                </tr>
              </tbody>
            </Table>
            <div className="text-center mt-3">
              <p>
                <strong>Token:</strong> {submission.token}
              </p>
            </div>
          </Card.Body>
        </Card>
        <Card className="mt-3">
          <Card.Header className="text-center">
            <h3>Code</h3>
          </Card.Header>
          <Card.Body>
            <CodeMirror
              value={submission.source_code}
              height="500px"
              editable={false}
            />
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Submission;