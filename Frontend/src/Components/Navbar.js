import { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function SimpleNavbar() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (user) {
      setUserInfo(user);
    }
  }, []);

  const Logout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/';
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/dashboard">CC</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href={`/submissions/${userInfo?.email}`}>Submissions</Nav.Link>
        </Nav>
        {userInfo ? (
          <Nav className="ms-auto"> {/* Use ms-auto here to push the NavDropdown to the right */}
            <NavDropdown
              title={<img src={userInfo.pictdure} alt="Profile" style={{ width: 30, height: 30, borderRadius: '50%' }} />}
              align="end"
              className="ms-auto"  // Ensures it's aligned to the right
            >
              <NavDropdown.Item>Name : <strong>{userInfo.name}</strong></NavDropdown.Item>
              <NavDropdown.Item>Email : {userInfo.email}</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={Logout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ) : (
          <Nav className="ms-auto">
            <Nav.Link href="/">Login</Nav.Link>
          </Nav>
        )}

      </Container>
    </Navbar>
  );
}

export default SimpleNavbar;