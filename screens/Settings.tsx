import { View } from 'react-native';
import { makeStyles, Text, Button, useThemeMode } from '@rneui/themed';
import { supabase } from '../api/supabase';
import { Props } from '../App';

export default ({ navigation: { push } }: Props) => {
  const styles = useStyles();
  const { setMode, mode } = useThemeMode();

  const handleOnPress = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <View style={styles.container}>
      <Text h1>Settings </Text>
      <Button onPress={handleOnPress}>Switch Theme</Button>
      <Button onPress={() => supabase.auth.signOut().then(() => push('Login'))}>
        Log out
      </Button>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    marginVertical: theme.spacing.lg
  }
}));
