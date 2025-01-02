import { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import ProfileDropdown from './ProfileDropdown';

function SimpleNavbar() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (user) {
      setUserInfo(user);
    }
  }, []);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/dashboard">CC</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href={`/submissions/${userInfo?.email}`}>Submissions</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
          {userInfo && <ProfileDropdown userInfo={userInfo} />}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SimpleNavbar;