'use client';
import { useState, useEffect, memo } from 'react';

const ThemeSwitcher = memo(function ThemeSwitcher() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-switcher"
      aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
    >
      <div className="theme-switcher-inner">
        <span className="theme-icon">
          {theme === 'light' ? '🌙' : '☀️'}
        </span>
        <span className="theme-text">
          {theme === 'light' ? 'Oscuro' : 'Claro'}
        </span>
      </div>
    </button>
  );
});

export default ThemeSwitcher;