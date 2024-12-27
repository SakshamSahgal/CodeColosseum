import React from 'react';
import { Card, Accordion } from 'react-bootstrap';
import CodeMirror from '@uiw/react-codemirror';

function StdoutPallet({ stdout }) {
    return (
        <Accordion defaultActiveKey={stdout ? "0" : "1"} className='mt-3'>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Stdout</Accordion.Header>
                <Accordion.Body>
                    <Card.Body>
                        <CodeMirror
                            value={stdout ? stdout : ''}
                            height="500px"
                            editable={false}
                        />
                    </Card.Body>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default StdoutPallet;