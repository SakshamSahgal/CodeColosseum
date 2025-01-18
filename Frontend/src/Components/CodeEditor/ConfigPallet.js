
import { Row, Col } from 'react-bootstrap';
import LanguageDropdown from './LanguageDropdown';
import ThemeFooter from './ThemeFooter';
import SubmissionNameSetting from '../SubmissionNameSetting';

function ConfigPallet({ languages, selectedLanguageId, setSelectedLanguageId, currentTheme, handleThemeChange, submissionName, setSubmissionName }) {
    return (
        <> {/* Div visible on xs and sm screens only */}
            <div className="d-block d-md-none">
                <Row>
                    <Col xs={6} className="d-flex align-items-center justify-content-left">
                        <LanguageDropdown
                            languages={languages}
                            selectedLanguageId={selectedLanguageId}
                            setSelectedLanguageId={setSelectedLanguageId}
                        />
                    </Col>
                    <Col xs={6} className="d-flex justify-content-end">
                        <ThemeFooter
                            currentThemeName={currentTheme.name}
                            handleThemeChange={handleThemeChange}
                        />
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="d-flex align-items-center justify-content-center">
                        <SubmissionNameSetting
                            submissionName={submissionName}
                            setSubmissionName={setSubmissionName}
                        />
                    </Col>
                </Row>
            </div>
            {/* Div visible on md and lg screens only */}
            <div className="d-none d-md-block">
                <Row>
                    <Col md={4} className="d-flex align-items-center justify-content-left">
                        <LanguageDropdown
                            languages={languages}
                            selectedLanguageId={selectedLanguageId}
                            setSelectedLanguageId={setSelectedLanguageId}
                        />
                    </Col>
                    <Col md={4} className="d-flex align-items-center justify-content-center">
                        <SubmissionNameSetting
                            submissionName={submissionName}
                            setSubmissionName={setSubmissionName}
                        />
                    </Col>
                    <Col md={4} className="d-flex justify-content-end">
                        <ThemeFooter
                            currentThemeName={currentTheme.name}
                            handleThemeChange={handleThemeChange}
                        />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ConfigPallet;