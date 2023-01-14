import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeMode, ThemeMode } from '@rneui/themed';
import { useContext, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Props } from '../App';
import { Fill } from '../components';
import { AuthContext } from '../contexts/Auth';

// Landing goals:
//  - Check theme setting
//    - apply saved theme setting
//  - Check user persistence
//    - if logged in
//      - navigate -> Feed
//    - if not logged in
//      - navigate -> Login
export default function Landing({ navigation: { push } }: Props) {
  const { user } = useContext(AuthContext);
  const { setMode } = useThemeMode();

  // On initial load
  useEffect(() => {
    // Check which theme was saved
    AsyncStorage.getItem('theme').then((theme) => {
      // apply theme
      setMode((theme !== null ? theme : 'light') as ThemeMode);
    });

    // if logged in
    if (user !== undefined)
      if (user) {
        push('Home');
        // - if not logged in
      } else {
        push('Login');
      }
  }, [user]);
  return (
    <Fill>
      <ActivityIndicator size='large' />
    </Fill>
  );
}
