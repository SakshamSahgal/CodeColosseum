import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
// import { Accordion, Card } from 'react-bootstrap';

function StdinPallet({ setStdin, stdin = "", isEditable = true, isExpanded = false }) {
    return (

        <CodeMirror
            value={stdin}
            height="200px"
            onChange={(editor, data, value) => {
                console.log(editor);
                setStdin(editor);
            }}
            editable={isEditable}
        />
    );
}

export default StdinPallet;
