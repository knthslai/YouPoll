import { Button, useThemeMode } from '@rneui/themed';
import { Props } from '../App';
import { Fill } from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../components/Card';
import { useContext } from 'react';
import { PollContext } from '../contexts/Poll';
import { useLogOut } from '../hooks/users';

// Settings goal:
// - Change style theme: "light" or "dark"
// - Log out of supabase auth
export default ({ navigation: { push } }: Props) => {
  const { mutate } = useLogOut();
  const { setPollId, setPoll } = useContext(PollContext);
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
  const handleLogOut = () => {
    setPollId(undefined);
    setPoll(undefined);
    mutate();
  };

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
