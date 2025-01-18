import CodeMirror from "@uiw/react-codemirror";

function InputTab({ stdin, setStdin }) {
    return (
        <CodeMirror
            value={stdin}
            height="75vh" // Use all available height
            maxHeight="75vh" // Prevent exceeding screen height
            theme={"dark"}
            onChange={(value, viewUpdate) => {
                console.log(value);
                setStdin(value);
            }}
            className='shadow'
        />
    );
}

export default InputTab;