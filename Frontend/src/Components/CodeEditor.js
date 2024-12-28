import CodeMirror from '@uiw/react-codemirror';
import { Container, Row, Col } from 'react-bootstrap';
import makeApiRequest from '../Assets/Apis';
import { useEffect, useState } from 'react';
import SubmitCode from './SubmitCode';
import StdinPallet from './StdinPallet';
import { Card } from 'react-bootstrap';
import LanguageDropdown from './CodeEditor/LanguageDropdown.js';
import ThemeFooter from './CodeEditor/ThemeFooter.js';

function CodeEditor() {

    const [languages, setLanguages] = useState([]);
    const [selectedLanguageId, setSelectedLanguageId] = useState(2);
    const [sourceCode, setSourceCode] = useState(`#include <iostream>\n\nint main() {\n\tstd::cout << "Hello, World!" << std::endl;\n\treturn 0;\n}`);
    const [stdin, setStdin] = useState('');
    const [theme, setTheme] = useState('default'); // Default theme

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
        <Container className='bg-light'>
            <Row>
                <Col>
                    <Card className="mt-3">
                        <Card.Header className="bg-dark">
                            <LanguageDropdown languages={languages} selectedLanguageId={selectedLanguageId} setSelectedLanguageId={setSelectedLanguageId} />
                        </Card.Header>
                            <CodeMirror
                                value={sourceCode}
                                height="500px"
                                theme={theme === 'default' ? undefined : theme}
                                onChange={(editor, data, value) => {
                                    console.log(editor);
                                    setSourceCode(editor);
                                }}
                            />

                        <Card.Footer className='text-center bg-dark'>
                                <ThemeFooter theme={theme} handleThemeChange={handleThemeChange} />
                        </Card.Footer>
                    </Card>

                </Col>
            </Row>
            <Row className='my-3'>
                <StdinPallet setStdin={setStdin} />
            </Row>
            <Row>
                <Col>
                    <SubmitCode selectedLanguageId={selectedLanguageId} sourceCode={sourceCode} stdin={stdin} />
                </Col>
            </Row>
        </Container>
    );
}

export default CodeEditor;
