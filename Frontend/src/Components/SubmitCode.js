import makeApiRequest from "../Assets/Apis";
import { Button, Col, Row } from "react-bootstrap";

function SubmitCode({ selectedLanguageId, sourceCode, stdin }) {

    const createSubmission = () => {
        console.log(selectedLanguageId, sourceCode, stdin);
        makeApiRequest({
            url: '/compiler/createSubmission',
            method: 'POST',
            data: {
                language_id: selectedLanguageId,
                source_code: sourceCode,
                stdin: stdin,
            },
            onSuccess: (data) => {
               alert('Submission created successfully');
            },
        });
    }

    return (
        <Row className='p-3'>
            <Col>
                <Button variant="primary" className="w-100" onClick={createSubmission}>Submit</Button>
            </Col>
        </Row>
    )
}

export default SubmitCode;