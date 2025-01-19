import SimpleNavbar from '../Components/Navbar';
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap';
import { useState } from 'react';
import { FaCode, FaTerminal } from 'react-icons/fa'; // Import icons
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import CodeTab from '../Components/CodeTab';
import InputTab from '../Components/InputTab';
import OutputTab from '../Components/OutputTab';

function Dashboard() {
  const [stdin, setStdin] = useState('');
  const [languages, setLanguages] = useState([]);
  const [selectedLanguageId, setSelectedLanguageId] = useState(-1);
  const [sourceCode, setSourceCode] = useState(`#include <iostream>\nusing namespace std;\nint main() {\n cout << "Hello, World!";\n return 0;\n}`);
  const [currentTheme, setCurrentTheme] = useState({ name: 'okaidia', value: okaidia });
  const [submissionName, setSubmissionName] = useState('Untitled');

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
  };

  return (
    <div>
      <SimpleNavbar />
      <Container className='my-5 rounded shadow' fluid style={{ height: '82vh' }} >
        <Row className='my-3'>
          <Col md={6} style={{ borderRight: '2px solid #ddd' }}> {/* Vertical Line Here */}
            <Tabs defaultActiveKey="codeEditor" fill style={{ borderRadius: "5px" }}>
              <Tab eventKey="codeEditor" title={<span> <FaCode style={{ marginRight: '5px' }} /> Code Editor</span>}>
                <CodeTab languages={languages} setLanguages={setLanguages} selectedLanguageId={selectedLanguageId} setSelectedLanguageId={setSelectedLanguageId} sourceCode={sourceCode} setSourceCode={setSourceCode} currentTheme={currentTheme} handleThemeChange={handleThemeChange} submissionName={submissionName} setSubmissionName={setSubmissionName} stdin={stdin} />
              </Tab>
              <Tab eventKey="input" title={<span> <FaTerminal style={{ marginRight: '5px' }} /> Input</span>} >
                <InputTab stdin={stdin} setStdin={setStdin} />
              </Tab>
            </Tabs>
          </Col>
          <Col md={6} style={{ borderLeft: '2px solid #ddd' }}> {/* Vertical Line Here */}
            <Tabs defaultActiveKey="output" fill style={{ borderRadius: "5px" }}>
              <Tab eventKey="output" title={<span> <FaTerminal style={{ marginRight: '5px' }} /> Output</span>} >
                <OutputTab />
              </Tab>
            </Tabs>
          </Col>
        </Row>

      </Container>
    </div>
  );
}

export default Dashboard;
