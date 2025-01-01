import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
// Import the themes
import { abyss } from '@uiw/codemirror-theme-abyss';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { githubLight } from '@uiw/codemirror-theme-github'; // GitHub theme
import { githubDark } from '@uiw/codemirror-theme-github'; // GitHub theme


function ThemeFooter({ theme, handleThemeChange }) {
    return (<ButtonGroup className="d-flex flex-wrap justify-content-start">
        <Button
            variant={theme === 'default' ? 'primary' : 'secondary'}
            onClick={() => handleThemeChange('default')}
        >
            Default
        </Button>
        <Button
            variant={theme === abyss ? 'primary' : 'secondary'}
            onClick={() => handleThemeChange(abyss)}
        >
            abyss
        </Button>
        <Button
            variant={theme === dracula ? 'primary' : 'secondary'}
            onClick={() => handleThemeChange(dracula)}
        >
            dracula
        </Button>
        <Button
            variant={theme === okaidia ? 'primary' : 'secondary'}
            onClick={() => handleThemeChange(okaidia)}
        >
            okaidia
        </Button>
        <Button
            variant={theme === githubLight ? 'primary' : 'secondary'}
            onClick={() => handleThemeChange(githubLight)}
        >
            githubLight
        </Button>
        <Button
            variant={theme === githubDark ? 'primary' : 'secondary'}
            onClick={() => handleThemeChange(githubDark)}
        >
            githubDark
        </Button>
    </ButtonGroup>)
}

export default ThemeFooter;