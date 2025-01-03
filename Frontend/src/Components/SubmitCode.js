import makeApiRequest from "../Assets/Apis";
import { Button, Col, Row } from "react-bootstrap";

function SubmitCode({ selectedLanguageId, sourceCode, stdin }) {

    const createSubmission = () => {
        console.log(selectedLanguageId, sourceCode, stdin);
        if(selectedLanguageId === -1 || sourceCode === '' || sourceCode === null) {
            alert('Choose your language and script your code, then cast it into the depths of the voids.');
            return;
        }
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
               //when the ok button is clicked, the page will be redirected to the submission page
               const user = JSON.parse(localStorage.getItem('userInfo'));
               window.location.href = `/submissions/${user.email}`;
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