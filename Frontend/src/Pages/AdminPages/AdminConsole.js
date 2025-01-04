import SimpleNavbar from '../../Components/Navbar.js';
import { useState, useEffect } from 'react';
import { Tab } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import AdminTab from '../../Assets/AdminTab.js';
import makeApiRequest from '../../Assets/Apis.js';
import AdminAccessOnly from '../../Components/AdminAccessOnly.js';

function AdminConsole() {

  const [activeKey, setActiveKey] = useState("systemInfo");
  const [data, setData] = useState("Loading...");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    handleSelect(activeKey);
  }, []);

  const handleSelect = (eventKey) => {
    console.log("Tab selected:", eventKey);
    setData("Loading..."); // Clear the data
    setActiveKey(eventKey); // Update the active key

    makeApiRequest({
      url: `/admin/${eventKey}`,
      onSuccess: (data) => {
        setData(data);
        setIsAdmin(true);
      },
      onError: (error) => {
        setIsAdmin(false);
      }
    });
  };

  return (isAdmin ? (
    <div>
      <SimpleNavbar />
      <Tab.Container defaultActiveKey={activeKey} onSelect={handleSelect}>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="systemInfo">System Info</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="configInfo">Config Info</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="statistics">Statistics</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="workers">Workers</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <AdminTab eventKey="systemInfo" title="System Information" data={data} />
          <AdminTab eventKey="configInfo" title="Configuration Information" data={data} />
          <AdminTab eventKey="statistics" title="Statistics" data={data} />
          <AdminTab eventKey="workers" title="Workers" data={data} />
        </Tab.Content>
      </Tab.Container>
    </div >
  ) : (<AdminAccessOnly />));

}

export default AdminConsole;