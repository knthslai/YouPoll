import { Button, useThemeMode } from '@rneui/themed';
import { supabase } from '../api/supabase';
import { Props } from '../App';
import { Fill } from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../components/Card';

// Settings goal:
// - Change style theme: "light" or "dark"
// - Log out of supabase auth
export default ({ navigation: { push } }: Props) => {
  const { setMode, mode } = useThemeMode();

  const handleThemeChange = () => {
    const theme = mode === 'dark' ? 'light' : 'dark';
    // store theme locally
    AsyncStorage.setItem('theme', theme).then(() => {
      // apply theme
      setMode(theme);
    });
  };

  // Signs out of supabase auth and redirects to Login
  const handleLogOut = () =>
    supabase.auth
      .signOut()
      .then(() => push('Login'))
      .catch(console.error);

  return (
    <Fill>
      <Card title='Settings'>
        <Button onPress={handleThemeChange} style={{ marginBottom: 8 }}>
          Switch Theme
        </Button>
        <Button onPress={handleLogOut}>Log out</Button>
      </Card>
    </Fill>
  );
};
