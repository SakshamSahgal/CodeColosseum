import CodeMirror from "@uiw/react-codemirror";

function OutputTab() {
    return (
        <CodeMirror
            value={""}
            height="75vh" // Use all available height
            maxHeight="75vh" // Prevent exceeding screen height
            theme={"dark"}
            className='shadow'
        />
    );
}

export default OutputTab;