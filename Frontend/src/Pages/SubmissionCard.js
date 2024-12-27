
import formatTimeElapsed from "../Assets/Utils.js";
import { Card } from "react-bootstrap";

function SubmissionCard({ submission }) {

    const redirectTosubmission = (submissionToken) => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        window.location.href = `/submission/${user.email}/${submissionToken}`;
      };

    return (
        <Card
            className="h-100 shadow-sm"
            onClick={() => redirectTosubmission(submission.token)}
            style={{ cursor: "pointer" }}
        >
            <Card.Body>
                <Card.Title className="text-primary">
                    Submission Details
                </Card.Title>
                <Card.Text>
                    <strong>Submitted:</strong> {formatTimeElapsed(submission.created_at)}
                </Card.Text>
                <Card.Text>
                    <strong>Language:</strong> {submission.language_name}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default SubmissionCard;