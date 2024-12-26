import { useState, useEffect } from 'react';
import { Navbar, Nav, NavLink, Dropdown } from 'react-bootstrap';
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
    <Navbar bg="dark" expand="lg" className="mb-4">
      {/* <Navbar.Brand as={Link} to="/" className="text-light">
        MyApp
      </Navbar.Brand> */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
        <Nav>
          <NavLink as={Link} to="/dashboard" className="text-light">
            Dashboard
          </NavLink>
          <NavLink as={Link} to={`/submissions/${userInfo?.email}`} className="text-light">
            Submissions
          </NavLink>
        </Nav>
        <Nav>
          {userInfo && (
            <Dropdown align="end">
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                <img
                  src={userInfo.picture}
                  alt="profile"
                  className="rounded-circle"
                  style={{ width: '30px', height: '30px' }}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.ItemText>
                  <strong>{userInfo.name}</strong>
                  <br />
                  {userInfo.email}
                </Dropdown.ItemText>
                <Dropdown.Divider />
                <Dropdown.Item onClick={Logout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default SimpleNavbar;