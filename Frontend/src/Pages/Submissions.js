import makeApiRequest from "../Assets/Apis";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import SimpleNavbar from "../Components/Navbar.js";
import SubmissionsContainer from "../Components/Submissions/SubmissionsContainer.js";
import PagenationFooter from "../Components/Submissions/PagenationFooter.js";
import { Container, Row, Col } from "react-bootstrap";

function Submissions() {
  const { email } = useParams();
  const [submissions, setSubmissions] = useState(null);
  const [maxEntriesPerPage, setMaxEntriesPerPage] = useState(5); // Default entries per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);

  const fetchSubmissions = () => {
    setSubmissions(null);
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



  return (
    <>
      <SimpleNavbar />
      <Container className='my-5 rounded shadow' fluid style={{ height: '82vh' }} >
        <Row className='my-3'>
          <Col md={6} style={{ borderRight: '2px solid #ddd' }}> {/* Vertical Line Here */}
            <SubmissionsContainer submissions={submissions} totalEntries={totalEntries} email={email} />
            <PagenationFooter maxEntriesPerPage={maxEntriesPerPage} handleEntriesChange={handleEntriesChange} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} bottom={false} />
          </Col>
          <Col md={6} style={{ borderLeft: '2px solid #ddd' }}> {/* Vertical Line Here */}

          </Col>
        </Row>

      </Container>
    </>
  );
}

export default Submissions;
