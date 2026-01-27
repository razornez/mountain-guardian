'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

/**
 * ThemeProvider Component
 * 
 * Wraps the application with next-themes provider for theme management.
 * Handles:
 * - System preference detection
 * - LocalStorage persistence
 * - Hydration safety
 * - Theme switching without flash
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
