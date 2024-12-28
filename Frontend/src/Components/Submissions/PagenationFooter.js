import { Container, Form, Pagination } from "react-bootstrap";

function PagenationFooter({ maxEntriesPerPage, handleEntriesChange, renderPagination }) {
    return (
        <div
            className="fixed-bottom bg-dark text-light py-3"
            style={{ borderTop: "2px solid #444" }}
        >
            <Container className="d-flex justify-content-between align-items-center">
                <Form.Group controlId="entriesPerPage" className="mb-0">
                    <Form.Label className="me-2">Entries per page:</Form.Label>
                    <Form.Select
                        value={maxEntriesPerPage}
                        onChange={handleEntriesChange}
                        style={{ width: "auto", display: "inline-block" }}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </Form.Select>
                </Form.Group>
                <Pagination className="mb-0">{renderPagination()}</Pagination>
            </Container>
        </div>
    )
}

export default PagenationFooter;