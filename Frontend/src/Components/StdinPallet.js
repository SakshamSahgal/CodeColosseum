import React from 'react';
import CodeMirror from '@uiw/react-codemirror';

function StdinPallet({ setStdin, stdin = "", isEditable = true, isExpanded = false }) {
    return (
        <div
            style={{
                height: '100%', // Ensure the parent container is used for height
                display: 'flex', // Flexbox for dynamic resizing
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch',
            }}
        >
            <CodeMirror
                value={stdin}
                onChange={(editor, data, value) => {
                    console.log(editor);
                    setStdin(editor);
                }}
                editable={isEditable}
                style={{
                    height: '80%', // 80% of the parent container
                    flexGrow: 1, // Ensures it stretches if parent resizes
                    border: '1px solid #ccc', // Optional styling for better visibility
                    borderRadius: '4px',
                }}
            />
        </div>
    );
}

export default StdinPallet;
