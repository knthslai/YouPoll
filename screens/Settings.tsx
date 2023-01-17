import { Button, useThemeMode, Text, Icon } from '@rneui/themed';
import { Props } from '../App.parts';
import { Fill, Loading, Row } from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../components/Card';
import { useContext } from 'react';
import { PollContext } from '../contexts/Poll';
import { useGetUser, useLogOut } from '../hooks';
import moment from 'moment';

// Settings goal:
// - Change style theme: "light" or "dark"
// - Log out of supabase auth
// - Display user info
export default ({ navigation: { push } }: Props) => {
  const { data: user, isLoading } = useGetUser();
  const { mutate } = useLogOut();
  const { setPollId } = useContext(PollContext);
  const { setMode, mode } = useThemeMode();

  // Signs the user out
  const handleLogOut = () => {
    // also reset viewing poll Id
    setPollId(undefined);
    // using React query to invalidate 'user' queries
    mutate();
    // redirects to Login
    push('Login');
  };

  // - Change style theme: "light" or "dark"
  const handleThemeChange = () => {
    const theme = mode === 'dark' ? 'light' : 'dark';
    // store theme locally
    AsyncStorage.setItem('theme', theme).then(() => {
      // apply theme
      setMode(theme);
    });
  };

  if (!user || isLoading) return <Loading />;
  else {
    const { email, created_at } = user;
    return (
      <Fill>
        <Card title='Settings'>
          <Icon
            name='person-circle-outline'
            type='ionicon'
            size={100}
            color='gray'
          />
          <Row>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Email: </Text>
            <Text style={{ fontSize: 20 }}>{email}</Text>
          </Row>
          <Text
            style={{ alignSelf: 'center', marginBottom: 100, fontSize: 16 }}
          >
            Joined {moment(created_at).fromNow()}
          </Text>

          <Button
            type='clear'
            onPress={handleThemeChange}
            style={{ marginBottom: 8 }}
          >
            Switch Theme
          </Button>
          <Button onPress={handleLogOut}>Log out</Button>
        </Card>
      </Fill>
    );
  }
};
