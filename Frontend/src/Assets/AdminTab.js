import { Container, Tab, Table } from 'react-bootstrap';

function AdminTab({ eventKey, title, data }) {
    // Recursive function to render data
    const renderData = (data) => {
        if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
            return data.toString(); // Render primitive types as-is
        }

        if (Array.isArray(data)) {
            return (
                <Table striped bordered hover responsive className="my-3 shadow-sm">
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{renderData(item)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            );
        }

        if (typeof data === 'object' && data !== null) {
            return (
                <Container className="p-3 bg-light rounded shadow-sm">
                    <Table striped bordered hover responsive className="my-3">
                        <tbody>
                            {Object.entries(data).map(([key, value], index) => (
                                <tr key={index}>
                                    <td className="fw-bold">{key}</td>
                                    <td>{renderData(value)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
            );
        }

        return null; // Fallback for unsupported data types
    };

    return (
        <Tab.Pane eventKey={eventKey} title={title}>
            <div className="p-4">
                <h2 className="text-primary mb-4">{title}</h2>
                {renderData(data)}
            </div>
        </Tab.Pane>
    );
}

export default AdminTab;