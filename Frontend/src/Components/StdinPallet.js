import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { Accordion, Card } from 'react-bootstrap';

function StdinPallet({ setStdin }) {
    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Input</Accordion.Header>
                <Accordion.Body>
                    <Card.Body>
                        <CodeMirror
                            value={""}
                            height="200px"
                            onChange={(editor, data, value) => {
                                console.log(editor);
                                setStdin(editor);
                            }}
                        />
                    </Card.Body>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default StdinPallet;
