import { Dropdown, DropdownButton } from 'react-bootstrap';


function LanguageDropdown({ languages = [], selectedLanguageId, setSelectedLanguageId }) {
    {/*If not fetched yet, the default title will be "select language", else it will be the language with ID 2 */ }
    {/*When something is selected, find that language ID from the name and update the selectedLanguageId */ }
    return (
        <DropdownButton
            title={languages.find((lang) => lang.id === selectedLanguageId)?.name || "Select Language"}
            onSelect={(eventKey) => {
                setSelectedLanguageId(languages.find((lang) => lang.name === eventKey).id);
            }}
        >
            {languages.map((lang) => (
                <Dropdown.Item
                    key={lang.id}
                    eventKey={lang.name}
                >
                    {lang.name}
                </Dropdown.Item>
            ))}
        </DropdownButton>
    )
}


export default LanguageDropdown;