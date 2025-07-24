import { createContext, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const theme = {
    colors: {
      primary: 'from-blue-700 to-blue-900',
      secondary: 'from-blue-800 to-blue-600',
      accent: 'from-blue-600 to-cyan-500',
      background: 'from-black via-zinc-900 to-black',
      card: 'bg-black/80 backdrop-blur-lg',
      text: 'text-white',
      textSecondary: 'text-blue-200',
      border: 'border-blue-900/60',
      hover: 'hover:bg-blue-900/30',
      header: 'from-black via-blue-900 to-black',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}; 