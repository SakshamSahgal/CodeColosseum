import makeApiRequest from "../Assets/Apis";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import SimpleNavbar from "../Components/Navbar.js";
import SubmissionsContainer from "../Components/Submissions/SubmissionsContainer.js";
import PagenationFooter from "../Components/Submissions/PagenationFooter.js";

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
      <SubmissionsContainer submissions={submissions} totalEntries={totalEntries} />
      <PagenationFooter maxEntriesPerPage={maxEntriesPerPage} handleEntriesChange={handleEntriesChange} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}/>
    </>
  );
}

export default Submissions;
