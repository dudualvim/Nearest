import React, { useEffect, useState } from 'react';

const ThemeButton: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const theme = localStorage.getItem('theme');
      return theme === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    const box = document.querySelector('.box');
    const ball = document.querySelector('.ball');
    const body = document.body;

    if (isDarkMode) {
      box?.setAttribute('style', 'background-color:white;');
      ball?.setAttribute('style', 'transform: translateX(100%); border-color:white;');
      body?.setAttribute('style', 'background-color:#334155; color:white;');
    } else {
      box?.setAttribute('style', 'background-color:#334155; color:white;');
      ball?.setAttribute('style', 'transform: translateX(0%);');
      body?.setAttribute('style', 'background-color:white; color:#334155;');
    }
  }, [isDarkMode]);

  return (
    <div className="containerTheme">
      <div className="box bigger">
        <div className="scenary">
          <img
            src="/images/icon-moon.png"
            alt="Moon Icon"
            className="moon"
            onClick={toggleTheme}

          />
          <div
            className="ball"
            style={{ transform: isDarkMode ? 'translateX(100%)' : 'translateX(0%)' }}
            onClick={toggleTheme}
          ></div>
          <img
            src="/images/icon-sun.png"
            alt="Sun Icon"
            className="sun"
            onClick={toggleTheme}
          />
        </div>
      </div>
    </div>
  );
};

export default ThemeButton;