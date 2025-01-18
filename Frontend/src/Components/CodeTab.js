import { Card } from "react-bootstrap";
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from "@codemirror/lang-cpp";
import makeApiRequest from "../Assets/Apis";
import { useEffect } from "react";
import SubmitCode from "./SubmitCode";
import ConfigPallet from "../Components/CodeEditor/ConfigPallet";

function CodeTab({ languages, selectedLanguageId, setSelectedLanguageId, sourceCode, setSourceCode, currentTheme, handleThemeChange, setLanguages, submissionName, setSubmissionName, stdin }) {

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
        <Card className="my-3 shadow">
            <Card.Header>
                <ConfigPallet languages={languages} selectedLanguageId={selectedLanguageId} setSelectedLanguageId={setSelectedLanguageId} currentTheme={currentTheme} handleThemeChange={handleThemeChange} submissionName={submissionName} setSubmissionName={setSubmissionName} />
            </Card.Header>
            <Card.Body>
                <CodeMirror
                    value={sourceCode}
                    height="60vh"
                    maxHeight="60vh"
                    theme={currentTheme.value} // Apply the selected theme
                    extensions={[cpp()]}
                    onChange={(editor, data, value) => {
                        setSourceCode(editor);
                    }}
                />
            </Card.Body>
            <Card.Footer>
                <SubmitCode selectedLanguageId={selectedLanguageId} sourceCode={sourceCode} stdin={stdin} submissionName={submissionName} />
            </Card.Footer>
        </Card>
    );
}

export default CodeTab;
