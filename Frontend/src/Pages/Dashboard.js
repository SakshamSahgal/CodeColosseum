import SimpleNavbar from '../Components/Navbar';
import { Container, Row, Col, Tab, Tabs, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { FaCode, FaTerminal } from 'react-icons/fa'; // Import icons
import ThemeFooter from '../Components/CodeEditor/ThemeFooter';
import makeApiRequest from '../Assets/Apis';
import LanguageDropdown from '../Components/CodeEditor/LanguageDropdown';
import { cpp } from "@codemirror/lang-cpp"

function Dashboard() {
  const [stdin, setStdin] = useState('');
  const [languages, setLanguages] = useState([]);
  const [selectedLanguageId, setSelectedLanguageId] = useState(-1);
  const [sourceCode, setSourceCode] = useState(`#include <iostream>\nusing namespace std;\nint main() {\n cout << "Hello, World!";\n return 0;\n}`);

  const [theme, setTheme] = useState('default'); // Default theme
  const [activeTab, setActiveTab] = useState('codeEditor'); // Tracks active tab

  useEffect(() => {
    makeApiRequest({
      url: '/compiler/languages',
      method: 'GET',
      onSuccess: (data) => {
        setLanguages(data);
      },
    });
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div>
      <SimpleNavbar />

      <Container className='my-5 rounded shadow' fluid style={{ height: '82vh' }} >
        <Row className='my-3'>
          <Col md={6} style={{ borderRight: '2px solid #ddd' }}> {/* Vertical Line Here */}
            <Tabs defaultActiveKey="codeEditor" fill style={{ borderRadius: "5px" }}>
              <Tab eventKey="codeEditor" title={
                <span>
                  <FaCode style={{ marginRight: '5px' }} /> Code Editor
                </span>
              }>
                {/* make a card */}
                <Card>
                  <Card.Header>
                    <LanguageDropdown
                      languages={languages}
                      selectedLanguageId={selectedLanguageId}
                      setSelectedLanguageId={setSelectedLanguageId}
                    />
                  </Card.Header>
                  <Card.Body>
                    <CodeMirror
                      value={sourceCode}
                      height="60vh" // Use all available height
                      maxHeight="60vh" // Prevent exceeding screen height
                      theme={theme === 'default' ? undefined : theme}
                      extensions={[cpp()]}
                      onChange={(editor, data, value) => {
                        console.log(editor);
                        setSourceCode(editor);
                      }}
                    />
                  </Card.Body>
                  <Card.Footer>
                    <ThemeFooter
                      theme={theme}
                      handleThemeChange={handleThemeChange}
                    />
                  </Card.Footer>
                </Card>

              </Tab>
              <Tab eventKey="input" title={<span> <FaTerminal style={{ marginRight: '5px' }} /> Input</span>} >
                <CodeMirror
                  value={stdin}
                  height="75vh" // Use all available height
                  maxHeight="75vh" // Prevent exceeding screen height
                  theme={"dark"}
                  onChange={(value, viewUpdate) => {
                    console.log(value);
                    setStdin(value);
                  }}
                  className='shadow'
                />
              </Tab>
            </Tabs>
          </Col>
          <Col md={6} style={{ borderLeft: '2px solid #ddd' }}> {/* Vertical Line Here */}
            <Tabs defaultActiveKey="output" fill style={{ borderRadius: "5px" }}>
              <Tab eventKey="output" title={<span> <FaTerminal style={{ marginRight: '5px' }} /> Output</span>} >
                <CodeMirror
                  value={stdin}
                  height="75vh" // Use all available height
                  maxHeight="75vh" // Prevent exceeding screen height
                  theme={"dark"}
                  onChange={(value, viewUpdate) => {
                    console.log(value);
                    setStdin(value);
                  }}
                  className='shadow'
                />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
