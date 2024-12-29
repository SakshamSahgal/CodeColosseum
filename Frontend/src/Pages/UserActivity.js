import { useParams } from "react-router";
import { useEffect, useState } from "react";
import makeApiRequest from "../Assets/Apis";
import PagenationFooter from "../Components/Submissions/PagenationFooter";
import { Container, Pagination } from "react-bootstrap";
import UserLogs from "../Components/UserLogs";

function UserActivity() {
    const { email } = useParams();
    const [maxEntriesPerPage, setMaxEntriesPerPage] = useState(5); // Default entries per page
    const [currentPage, setCurrentPage] = useState(1);
    const [activityData, setActivityData] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);

    useEffect(() => {
        console.log(email);
        makeApiRequest({
            url: `admin/user/activity/${email}/${maxEntriesPerPage}/${currentPage}`, // This is the updated code
            method: 'GET', // This is the updated code
            onSuccess: (data) => {
                setActivityData(data.userLogs);
                setTotalPages(data.totalPages);
                setTotalEntries(data.totalEntries);
            }
        });
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
        <h1>User Activity (Total Logs : {totalEntries})</h1>
        <UserLogs activityData={activityData} />
        <PagenationFooter maxEntriesPerPage={maxEntriesPerPage} handleEntriesChange={handleEntriesChange} renderPagination={renderPagination} />
    </>
    );
}

export default UserActivity;