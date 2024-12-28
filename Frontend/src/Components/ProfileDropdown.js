import { Nav, NavDropdown } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
function ProfileDropdown({ userInfo }) {

    const [imageError, setImageError] = useState(false); // for fallback image

    const Logout = () => {
        localStorage.removeItem('userInfo');
        window.location.href = '/';
    };

    return (
        <Nav className="ms-auto"> {/* Use ms-auto here to push the NavDropdown to the right */}
            <NavDropdown
                title={
                    !imageError ? (
                        <img
                            src={userInfo.picture}
                            alt="Profile"
                            style={{ width: 30, height: 30, borderRadius: '50%' }}
                            onError={() => setImageError(true)} // Handle image load error
                        />
                    ) : (
                        <FaUserCircle style={{ width: 30, height: 30 }} /> // Fallback icon
                    )
                }
                align="end"
                className="ms-auto" // Ensures it's aligned to the right
            >
                <NavDropdown.Item onClick={() => window.location.href = `/profile/${userInfo.email}`}>
                    Name : <strong>{userInfo.name}</strong> <br />
                    Email : {userInfo.email}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={Logout}>
                    Logout
                </NavDropdown.Item>
            </NavDropdown>
        </Nav>
    );
}


export default ProfileDropdown;