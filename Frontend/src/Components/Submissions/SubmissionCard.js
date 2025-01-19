import React from "react";
import { Button } from "react-bootstrap";
import formatTimeElapsed from "../../Assets/Utils.js";

function SubmissionRow({ submission, email }) {
    const redirectTosubmission = (submissionToken) => {
        window.location.href = `/submission/${email}/${submissionToken}`;
    };

    return (
        <tr
            style={{ cursor: "pointer" }}
            onClick={() => redirectTosubmission(submission.token)}
        >
            <td>{formatTimeElapsed(submission.created_at)}</td>
            <td>{submission.language_name}</td>
        </tr>
    );
}

export default SubmissionRow;