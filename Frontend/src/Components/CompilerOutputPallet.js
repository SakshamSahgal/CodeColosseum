import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { Accordion, Card } from 'react-bootstrap';

function CompilerOutputPallet({ compile_output }) {
    if (!compile_output) {
        return null;
    }
    return (
        <Accordion className='mt-3' defaultActiveKey={compile_output ? "0" : "1"}>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Compiler output</Accordion.Header>
                <Accordion.Body>
                    <Card.Body>
                        <CodeMirror
                            value={compile_output ? compile_output : ''}
                            height="500px"
                            editable={false}
                        />
                    </Card.Body>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default CompilerOutputPallet;