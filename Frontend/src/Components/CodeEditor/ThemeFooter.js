import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

// Import themes inside ThemeFooter
import { abyss } from '@uiw/codemirror-theme-abyss';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { githubLight } from '@uiw/codemirror-theme-github';
import { githubDark } from '@uiw/codemirror-theme-github';

// Import icons
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const themes = [
  { name: 'default', value: undefined }, // Default theme
  { name: 'abyss', value: abyss },
  { name: 'dracula', value: dracula },
  { name: 'okaidia', value: okaidia },
  { name: 'githubLight', value: githubLight },
  { name: 'githubDark', value: githubDark },
];

// A component that takes the current theme name and a function to change the theme, and displays a button group to change the theme
function ThemeFooter({ currentThemeName, handleThemeChange }) {
  const [currentIndex, setCurrentIndex] = useState(
    themes.findIndex((theme) => theme.name === currentThemeName) || 0
  );

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % themes.length;
    setCurrentIndex(nextIndex);
    handleThemeChange(themes[nextIndex]);
  };

  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + themes.length) % themes.length;
    setCurrentIndex(prevIndex);
    handleThemeChange(themes[prevIndex]);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <ButtonGroup>
        <Button size="sm" variant="secondary" onClick={handlePrevious}>
          <FaArrowLeft />
        </Button>
        <Button size="sm" variant="primary" disabled>
          {themes[currentIndex].name}
        </Button>
        <Button size="sm" variant="secondary" onClick={handleNext}>
          <FaArrowRight />
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default ThemeFooter;
