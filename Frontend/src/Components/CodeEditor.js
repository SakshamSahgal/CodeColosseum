
import CodeMirror from '@uiw/react-codemirror';

function CodeEditor() {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <CodeMirror
                            value={"#include <iostream>\n\nint main() {\n\tstd::cout << \"Hello, World!\" << std::endl;\n\treturn 0;\n}"}
                            height={"500px"}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button className="btn btn-primary">Run</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CodeEditor;