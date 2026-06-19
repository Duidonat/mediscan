import React, { createContext, useContext, ReactNode } from 'react';
import { themeTokens, ThemeTokens } from './tokens';

const ThemeContext = createContext<ThemeTokens>(themeTokens);

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeContext.Provider value={themeTokens}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeTokens {
  return useContext(ThemeContext);
}

export { themeTokens };
