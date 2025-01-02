import { useState, useEffect } from 'react';
import makeApiRequest from "../Assets/Apis";
import PagenationFooter from '../Components/Submissions/PagenationFooter';
import { Row, Col, Container, Button } from 'react-bootstrap';
import UserProfilePallet from './UserProfilePallet';

function Users() {
    const [users, setUsers] = useState({});
    const [maxEntriesPerPage, setMaxEntriesPerPage] = useState(5); // Default entries per page
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);

    useEffect(() => {
        makeApiRequest({
            url: `/admin/users/${maxEntriesPerPage}/${currentPage}`,
            method: "GET",
            onSuccess: (data) => {
                setUsers(data.users);
                setTotalPages(data.totalPages);
                setTotalEntries(data.totalEntries);
            },
            onError: (error) => {
                setUsers(null);
            }
        });
    }, [currentPage, maxEntriesPerPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleEntriesChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setMaxEntriesPerPage(value);
        setCurrentPage(1); // Reset to the first page when entries per page change
    };

    return (
        <div>
            <div>
                <h1 className="my-4 text-center">User Activity ({totalEntries ? totalEntries : 0} Users Total)</h1>
                <Container>
                    <Row>
                        {users && users.length > 0 ? (
                            users.map(user => (
                                <Col key={user._id} className="mb-4">
                                    <div style={{ width: "24rem" }} className="text-center">
                                        <UserProfilePallet user={user} />
                                        <Button href={`/admin/userActivity/${user.email}`} variant="dark" className="mt-3" style={{ width: "100%" }}>
                                            View Activity
                                        </Button>
                                    </div>
                                </Col>
                            ))
                        ) : (
                            <p>No users found.</p>
                        )}
                    </Row>
                </Container>
                <PagenationFooter maxEntriesPerPage={maxEntriesPerPage} handleEntriesChange={handleEntriesChange} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
            </div>
        </div>
    );
}

export default Users;