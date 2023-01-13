import React, { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@rneui/themed';
import Component from './components/MyComponent';
import { supabase } from './api/supabase';

const theme = createTheme({
  lightColors: {},
  darkColors: {}
});

export default function App() {
  useEffect(() => {
    supabase.auth;
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Component />
    </ThemeProvider>
  );
}
