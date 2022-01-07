import React from 'react';
import useDarkMode from 'use-dark-mode';
import { Icon, Checkbox } from 'semantic-ui-react'

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false);
  const aColor = 'yellow';
  
  return (
    <div className="dark-mode-toggle">
      <Icon name='sun' color={!darkMode.value && aColor} circular/>
      <span className="toggle-control">
        <Checkbox toggle 
          className="dmcheck"
          type="checkbox"
          checked={darkMode.value}
          onChange={ darkMode.toggle}
          id="dmcheck"/>
        <label htmlFor="dmcheck" />
      </span>
      <Icon name='moon outline' color={darkMode.value && aColor} circular/>
    </div>
  );
};

export default DarkModeToggle;
