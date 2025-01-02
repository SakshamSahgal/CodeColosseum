import { useParams } from "react-router";
import { useEffect, useState } from "react";
import makeApiRequest from "../Assets/Apis";
import PagenationFooter from "../Components/Submissions/PagenationFooter";
import UserLogs from "../Components/UserLogs";
import { Container, Row, Col, Card } from 'react-bootstrap';

function UserActivity() {
    const { email } = useParams();
    const [maxEntriesPerPage, setMaxEntriesPerPage] = useState(5); // Default entries per page
    const [currentPage, setCurrentPage] = useState(1);
    const [activityData, setActivityData] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);

    useEffect(() => {
        makeApiRequest({
            url: `admin/user/activity/${email}/${maxEntriesPerPage}/${currentPage}`,
            method: 'GET',
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

    return (
        <Container className="mt-5">
            <Row className="mb-4">
                <Col>
                    <h1>User Activity (Total Logs: {totalEntries})</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <UserLogs activityData={activityData} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <PagenationFooter
                maxEntriesPerPage={maxEntriesPerPage}
                handleEntriesChange={handleEntriesChange}
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
        </Container>
    );
}

export default UserActivity;
