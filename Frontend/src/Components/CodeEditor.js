import CodeMirror from '@uiw/react-codemirror';
import { Container, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import makeApiRequest from '../Assets/Apis';
import { useEffect, useState } from 'react';
import SubmitCode from './SubmitCode';
import StdinPallet from './StdinPallet';
import { Card } from 'react-bootstrap';

function CodeEditor() {

    const [languages, setLanguages] = useState([]);
    const [selectedLanguageId, setSelectedLanguageId] = useState(2);
    const [sourceCode, setSourceCode] = useState(`#include <iostream>\n\nint main() {\n\tstd::cout << "Hello, World!" << std::endl;\n\treturn 0;\n}`);
    const [stdin, setStdin] = useState('');

    useEffect(() => {
        makeApiRequest({
            url: '/compiler/languages',
            method: 'GET',
            onSuccess: (data) => {
                setLanguages(data);
            },
        });
    }, []);

    return (
        <Container className='bg-light'>
            <Row>
                <Col>
                    <Card className="mt-3">
                        <Card.Header className="text-center bg-dark">
                            {/*If not fetched yet, the default title will be "select language", else it will be the language with ID 2 */}
                            {/*When something is selected, find that language ID from the name and update the selectedLanguageId */}
                            <DropdownButton
                                title={languages.find((lang) => lang.id === selectedLanguageId)?.name || "Select Language"}
                                onSelect={(eventKey) => {
                                    setSelectedLanguageId(languages.find((lang) => lang.name === eventKey).id);
                                }}
                            >
                                {languages.map((lang) => (
                                    <Dropdown.Item
                                        key={lang.id}
                                        eventKey={lang.name}
                                    >
                                        {lang.name}
                                    </Dropdown.Item>
                                ))}
                            </DropdownButton>
                        </Card.Header>
                        <Card.Body>
                            <CodeMirror
                                value={sourceCode}
                                height="500px"
                                onChange={(editor, data, value) => {
                                    console.log(editor);
                                    setSourceCode(editor);
                                }}
                            />
                        </Card.Body>
                        <Card.Footer className='text-center bg-dark'>
                        </Card.Footer>
                    </Card>

                </Col>
            </Row>
            <Row className='my-3'>
                <StdinPallet setStdin={setStdin} />
            </Row>
            <Row>
                <Col>
                    <SubmitCode selectedLanguageId={selectedLanguageId} sourceCode={sourceCode} stdin={stdin}/>
                </Col>
            </Row>
        </Container>
    );
}

export default CodeEditor;
