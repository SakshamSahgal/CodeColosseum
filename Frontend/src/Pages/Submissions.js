import makeApiRequest from "../Assets/Apis";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Container, Col, Row, Pagination, Form } from "react-bootstrap";
import SimpleNavbar from "../Components/Navbar.js";
import SubmissionCard from "./SubmissionCard.js";
function Submissions() {
  const { email } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [maxEntriesPerPage, setMaxEntriesPerPage] = useState(5); // Default entries per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const fetchSubmissions = () => {
    makeApiRequest({
      url: `/compiler/allSubmissions/${email}/${maxEntriesPerPage}/${currentPage}`,
      method: "GET",
      onSuccess: (data) => {
        setSubmissions(data.submissions);
        setTotalPages(data.totalPages);
        setTotalEntries(data.totalEntries);
      },
    });
  };

  useEffect(() => {
    fetchSubmissions();
  }, [email, currentPage, maxEntriesPerPage]);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEntriesChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setMaxEntriesPerPage(value);
    setCurrentPage(1); // Reset to the first page when entries per page change
  };

  const renderPagination = () => {
    let items = [];
    for (let page = 1; page <= totalPages; page++) {
      items.push(
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <>
      <SimpleNavbar />
      <Container>
        <h1 className="my-4">Submissions ({totalEntries} Submissions Total)</h1>
        {submissions.length > 0 ? (
          <Row xs={1} md={2} lg={3} className="g-4">
            {submissions.map((submission) => (
              <Col key={submission._id}>
                <SubmissionCard submission={submission} />
              </Col>
            ))}
          </Row>
        ) : (
          <p>No submissions found.</p>
        )}
      </Container>
      {/* Footer Section */}
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
    </>
  );
}

export default Submissions;
