import { Alert } from "react-bootstrap";

function AlertBox({ heading, message }) {
    return (
        <Alert variant="warning" className="text-center shadow-sm p-4 mt-4">
            <h4 className="mb-3">{heading}</h4>
            <p> {message} </p>
        </Alert>
    );
}

export default AlertBox;