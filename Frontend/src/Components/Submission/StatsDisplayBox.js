import { Accordion, Card } from 'react-bootstrap';
import CodeMirror from '@uiw/react-codemirror';


function StatsDisplayBox({ content, title }) {
    if (!content) {
        return null;
    }
    return (
        <Accordion className='mt-3' defaultActiveKey={content ? "0" : "1"}>
            <Accordion.Item eventKey="0">
                <Accordion.Header>{title}</Accordion.Header>
                <Accordion.Body>
                    <Card.Body>
                        <CodeMirror
                            value={content ? content : ''}
                            height="500px"
                            editable={false}
                        />
                    </Card.Body>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default StatsDisplayBox;