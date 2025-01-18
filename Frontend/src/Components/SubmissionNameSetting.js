import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaCheck, FaPencilAlt } from 'react-icons/fa';


function SubmissionNameSetting({ submissionName, setSubmissionName }) {
    const [isEditing, setIsEditing] = useState(false); // Toggle editing mode
    const [tempName, setTempName] = useState(submissionName); // Temporary name while editing

    const handleEditToggle = () => {
        if (isEditing) {
            setSubmissionName(tempName); // Save the name when toggling off
        }
        setIsEditing(!isEditing); // Toggle editing state
    };

    return (
        isEditing ?
            <>
                <Form.Control
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="me-2"
                    style={{ maxWidth: '300px' }}
                />
                <Button
                    variant="success"
                    size="sm"
                    onClick={handleEditToggle}
                >
                    <FaCheck />
                </Button>
            </>
            :
            <>
                <span className="me-2" style={{ fontWeight: 'bold', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {submissionName || "Untitled"}
                </span>
                <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={handleEditToggle}
                >
                    <FaPencilAlt />
                </Button>
            </>
    )
}

export default SubmissionNameSetting;