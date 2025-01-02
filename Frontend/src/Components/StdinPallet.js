import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { Accordion, Card } from 'react-bootstrap';

function StdinPallet({ setStdin, stdin = "", isEditable = true, isExpanded = false }) {
    return (
        <Accordion defaultActiveKey={isExpanded ? "0" : "1"}>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Input</Accordion.Header>
                <Accordion.Body>
                    <Card.Body>
                        <CodeMirror
                            value={stdin}
                            height="200px"
                            onChange={(editor, data, value) => {
                                console.log(editor);
                                setStdin(editor);
                            }}
                            editable={isEditable}
                        />
                    </Card.Body>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default StdinPallet;
