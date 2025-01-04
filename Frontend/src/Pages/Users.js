import React, { useState } from "react";
import makeApiRequest from "../Assets/Apis";
import { Form, FormControl, Button, Table } from "react-bootstrap";
import SimpleNavbar from "../Components/Navbar";
import { Alert } from "react-bootstrap";
import { FaSearch } from 'react-icons/fa'; // Import the search icon

function Users() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchUsers = async () => {
        if (searchTerm === "") {
            alert("Please enter a search term");
            return;
        }
        makeApiRequest({
            url: `/search/users/${searchTerm}`,
            method: "GET",
            onSuccess: (data) => {
                console.log("Fetched users:", data);
                setUsers(data);
            },
            onError: (error) => {
                console.error("Failed to fetch users:", error);
            }
        });
    };

    // Handle form submission (Enter key press)
    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent the default form submission
        fetchUsers();  // Call the fetchUsers function
    };

    return (<>
        <SimpleNavbar />
        <div className="container mt-4">
            <h1 className="mb-4">Users</h1>

            {/* Search Form */}
            <Form className="d-flex mb-4" onSubmit={handleSubmit}>
                <FormControl
                    type="text"
                    placeholder="Search users"
                    className="me-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="primary" type="submit">
                    <FaSearch style={{ marginRight: '8px' }} />  {/* Add the icon with some spacing */}
                    Search
                </Button>
            </Form>

            {/* Users Table */}
            {users.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user._id}
                                style={{ cursor: 'pointer' }}
                                onClick={() => window.location.href = `/profile/${user.email}`}
                            >
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Alert variant="warning" className="text-center shadow-sm p-4 mt-4">
                    <h4 className="mb-3">Your search returned no results</h4>
                    <p> either you failed to query the abyss, or the void holds no answer in its shadows. </p>
                </Alert>
            )}
        </div>
    </>
    );
}

export default Users;
