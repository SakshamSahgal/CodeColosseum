import { useState, useEffect } from 'react';
import makeApiRequest from "../../Assets/Apis.js";
import PagenationFooter from '../../Components/Submissions/PagenationFooter.js';
import { Row, Col, Container, Button } from 'react-bootstrap';
import UserProfilePallet from '../UserProfilePallet.js';
import AdminAccessOnly from '../../Components/AdminAccessOnly.js';

function Users() {
    const [users, setUsers] = useState({});
    const [maxEntriesPerPage, setMaxEntriesPerPage] = useState(5); // Default entries per page
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        makeApiRequest({
            url: `/admin/users/${maxEntriesPerPage}/${currentPage}`,
            method: "GET",
            onSuccess: (data) => {
                setUsers(data.users);
                setTotalPages(data.totalPages);
                setTotalEntries(data.totalEntries);
                setIsAdmin(true);
            },
            onError: (error) => {
                setUsers(null);
                setIsAdmin(false);
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
        isAdmin ? (
            <div>
                <h1 className="my-4 text-center">User Activity ({totalEntries ? totalEntries : 0} Users Total)</h1>
                <Container>
                    <Row>
                        {users && users.length > 0 ? (
                            users.map(user => (
                                <Col key={user._id} className="mb-4">
                                    <div style={{ width: "24rem" }} className="text-center">
                                        <UserProfilePallet user={user} />
                                        <div className="mt-3">
                                            <Row>
                                                <Col>
                                                    <Button
                                                        href={`/admin/userActivity/${user.email}`}
                                                        variant="dark"
                                                        style={{ width: "100%" }}
                                                    >
                                                        View Activity
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <Button
                                                        href={`/profile/${user.email}`}
                                                        variant="dark"
                                                        style={{ width: "100%" }}
                                                    >
                                                        View Profile
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </Col>
                            ))
                        ) : (
                            <p>No users found.</p>
                        )}
                    </Row>
                </Container>
                <PagenationFooter
                    maxEntriesPerPage={maxEntriesPerPage}
                    handleEntriesChange={handleEntriesChange}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                />
            </div>
        ) : (
            <AdminAccessOnly />
        )
    );
}

export default Users;