import CodeMirror from '@uiw/react-codemirror';
import { Container, Row, Col, Card, Tabs, Tab } from 'react-bootstrap';
import makeApiRequest from '../Assets/Apis';
import { useEffect, useState } from 'react';
import SubmitCode from './SubmitCode';
import StdinPallet from './StdinPallet';
import LanguageDropdown from './CodeEditor/LanguageDropdown.js';
import ThemeFooter from './CodeEditor/ThemeFooter.js';

function CodeEditor() {

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
        <Container 
            fluid 
            style={{
                height: '100vh',
                padding: 0,
                margin: 0,
                backgroundColor: '#f8f9fa' // Light background color
            }}
        >
            <Row 
                style={{ 
                    height: '100%', 
                    margin: 0 
                }}
            >
                {/* Left Side: Tabs with Code Editor and Input */}
                <Col 
                    md={6} 
                    style={{ 
                        height: '100%', 
                        padding: 0 
                    }}
                >
                    <Card 
                        style={{ 
                            height: '100%', 
                            margin: 0, 
                            borderRadius: '0', 
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
                        }}
                    >
                        <Card.Header 
                            style={{ 
                                backgroundColor: '#343a40', 
                                color: 'white', 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center' 
                            }}
                        >
                            <h5 style={{ margin: 0 }}>Code and Input</h5>
                            <LanguageDropdown 
                                languages={languages} 
                                selectedLanguageId={selectedLanguageId} 
                                setSelectedLanguageId={setSelectedLanguageId} 
                            />
                        </Card.Header>

                        <Tabs 
                            activeKey={activeTab}
                            onSelect={(tab) => setActiveTab(tab)}
                            style={{ margin: 0, backgroundColor: '#e9ecef' }}
                        >
                            <Tab eventKey="codeEditor" title="Code Editor">
                                <div style={{ height: 'calc(100% - 50px)', padding: '10px' }}>
                                    <CodeMirror
                                        value={sourceCode}
                                        height="100%"
                                        theme={theme === 'default' ? undefined : theme}
                                        onChange={(editor, data, value) => {
                                            console.log(editor);
                                            setSourceCode(editor);
                                        }}
                                    />
                                </div>
                                <Card.Footer 
                                    style={{ 
                                        backgroundColor: '#343a40', 
                                        textAlign: 'center', 
                                        color: 'white' 
                                    }}
                                >
                                    <ThemeFooter 
                                        theme={theme} 
                                        handleThemeChange={handleThemeChange} 
                                    />
                                </Card.Footer>
                            </Tab>
                            <Tab eventKey="input" title="Input">
                                <div style={{ height: '100%', padding: '10px' }}>
                                    <StdinPallet setStdin={setStdin} />
                                </div>
                            </Tab>
                        </Tabs>
                    </Card>
                </Col>

                {/* Right Side: Output */}
                <Col 
                    md={6} 
                    style={{ 
                        height: '100%', 
                        padding: 0 
                    }}
                >
                    <Card 
                        style={{ 
                            height: '100%', 
                            margin: 0, 
                            borderRadius: '0', 
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
                        }}
                    >
                        <Card.Header 
                            style={{ 
                                backgroundColor: '#343a40', 
                                color: 'white' 
                            }}
                        >
                            <h5 style={{ margin: 0 }}>Output</h5>
                        </Card.Header>
                        <Card.Body>
                            {/* Leave this section blank for now */}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default CodeEditor;
