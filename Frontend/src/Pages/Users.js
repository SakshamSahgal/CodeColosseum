import React, { useState } from "react";
import makeApiRequest from "../Assets/Apis";
import { Form, FormControl, Button, Table } from "react-bootstrap";
import SimpleNavbar from "../Components/Navbar";
import AlertBox from "../Components/AlertBox";
import { FaSearch } from 'react-icons/fa'; // Import the search icon

function Users() {
    const [users, setUsers] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        //trip the search term of leading and trailing white space
        if (searchTerm.trim() === "") {
            alert("Please enter a search term");
            return;
        }
        makeApiRequest({
            url: `/search/users/${searchTerm.trim()}`,
            method: "GET",
            onSuccess: (data) => {
                console.log("Fetched users:", data);
                setUsers(data);
                setError(null);
            },
            onError: (error) => {
                setError(error.response.data);
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

            {error ? (
                <AlertBox heading={error.heading} message={error.message} />
            ) : (
                (users ? (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                            </tr >
                        </thead >
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
                    </Table >
                ) : (
                    <AlertBox heading={"Cast Your Query"} message={"Search boldly—the void holds answers, or perhaps only more questions. "} />
                ))
            )
            }
        </div >
    </>
    );
}

export default Users;
