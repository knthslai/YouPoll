import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { makeStyles } from '@rneui/themed';
import { supabase } from '../api/supabase';
import { Props } from '../App';

// Landing goals:
//  - Check user persistence
//    - if logged in
//      - navigate -> Feed
//    - if not logged in
//      - navigate -> Login
export default function Landing({ navigation: { push } }: Props) {
  const styles = useStyles();

  useEffect(() => {
    // - Check user persistence
    supabase.auth.getUser().then(({ data: { user } }) => {
      // if logged in
      if (user) {
        // navigate -> Feed
        push('Feed');
        // - if not logged in
      } else {
        // - navigate -> Login
        console.log(
          '🚀 ~ file: Landing.tsx:17 ~ supabase.auth.getUser ~ user',
          user
        );
        push('Login');
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' />
    </View>
  );
}

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
