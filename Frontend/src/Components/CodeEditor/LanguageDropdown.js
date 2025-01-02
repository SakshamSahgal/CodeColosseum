import { useEffect, useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

//if not yet fetched, the default title will be "Select Language", and selectedLanguageId will be -1 corresponding to the default language

function LanguageDropdown({ languages = [], selectedLanguageId = -1, setSelectedLanguageId }) {

    const [LanguageSelected, setLanguageSelected] = useState("Select Language");
    useEffect(() => {
        if (languages.length > 0) {
            // console.log(languages);
            let selectedLang = languages.find((lang) => lang.id === selectedLanguageId);
            if (selectedLang) {
                setLanguageSelected(selectedLang.name);
            } else {
                setLanguageSelected("Select Language");
            }
        }
    }, [languages, selectedLanguageId]);

    {/*When something is selected, find that language ID from the name and update the selectedLanguageId */ }
    return (
        <DropdownButton
            title={LanguageSelected}
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