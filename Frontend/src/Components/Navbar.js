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
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/dashboard">CC</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href={`/submissions/${userInfo?.email}`}>Submissions</Nav.Link>
          <Nav.Link href={`/about`}>About</Nav.Link>
        </Nav>
        {userInfo && (<ProfileDropdown userInfo={userInfo} />)}
      </Container>
    </Navbar>
  );
}

export default SimpleNavbar;