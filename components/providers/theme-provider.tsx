'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

/**
 * ThemeProvider Component
 * 
 * Encapsulates theme logic for the entire application.
 * Handles:
 * - Light Mode as default
 * - System preference opt-in
 * - LocalStorage persistence
 * - Hydration safety
 * - Theme switching without FOUC
 * 
 * @param children - React children to wrap
 * @param props - Additional ThemeProviderProps
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
