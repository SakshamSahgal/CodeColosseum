import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import makeApiRequest from '../Assets/Apis';
import { Card, Spinner, Container, Alert } from 'react-bootstrap';
import SimpleNavbar from '../Components/Navbar';
import CodeMirror from '@uiw/react-codemirror';
import StdoutPallet from '../Components/StdoutPallet';
import CompilerOutputPallet from '../Components/CompilerOutputPallet';
import SubmissionCard from '../Components/Submission/SubmissionCard';
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
  }, [submissionToken, email]);

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
      <Container className='mt-5'>
        {submission ? (<>
          <SubmissionCard submission={submission} />
          <CompilerOutputPallet compile_output={submission.compile_output} />
          <StdoutPallet stdout={submission.stdout} />
          <Card className="mt-3">
            <Card.Header className="text-center">
              <h3>Code</h3>
            </Card.Header>
            <Card.Body>
              <CodeMirror
                value={submission.source_code ? submission.source_code : ''}
                height="500px"
                editable={false}
              />
            </Card.Body>
          </Card>
        </>
        ) : (
          <Alert variant="warning" className="text-center shadow-sm p-4 mt-4">
            <h4 className="mb-3">Submission Not Found</h4>
            <p>
              The submission may have been lost in the void or never existed at all.
            </p>
          </Alert>
        )}
      </Container>

    </>
  );
}

export default Submission;