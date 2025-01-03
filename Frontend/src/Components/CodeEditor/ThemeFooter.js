import React from 'react';
import { Button } from 'react-bootstrap';
// Import the themes
import { abyss } from '@uiw/codemirror-theme-abyss';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { githubLight } from '@uiw/codemirror-theme-github'; // GitHub theme
import { githubDark } from '@uiw/codemirror-theme-github'; // GitHub theme

function ThemeFooter({ theme, handleThemeChange }) {
  return (
    <div className="d-flex flex-wrap justify-content-center">
      <Button
        size="sm"
        variant={theme === 'default' ? 'primary' : 'secondary'}
        onClick={() => handleThemeChange('default')}
        className="m-1"
      >
        Default
      </Button>
      <Button
        size="sm"
        variant={theme === abyss ? 'primary' : 'secondary'}
        onClick={() => handleThemeChange(abyss)}
        className="m-1"
      >
        abyss
      </Button>
      <Button
        size="sm"
        variant={theme === dracula ? 'primary' : 'secondary'}
        onClick={() => handleThemeChange(dracula)}
        className="m-1"
      >
        dracula
      </Button>
      <Button
        size="sm"
        variant={theme === okaidia ? 'primary' : 'secondary'}
        onClick={() => handleThemeChange(okaidia)}
        className="m-1"
      >
        okaidia
      </Button>
      <Button
        size="sm"
        variant={theme === githubLight ? 'primary' : 'secondary'}
        onClick={() => handleThemeChange(githubLight)}
        className="m-1"
      >
        githubLight
      </Button>
      <Button
        size="sm"
        variant={theme === githubDark ? 'primary' : 'secondary'}
        onClick={() => handleThemeChange(githubDark)}
        className="m-1"
      >
        githubDark
      </Button>
    </div>
  );
}

export default ThemeFooter;
