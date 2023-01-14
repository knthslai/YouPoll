import { Button, Text } from '@rneui/themed';
import { useContext } from 'react';
import { supabase } from '../api/supabase';
import { Props } from '../App';
import { Fill, Form } from '../components';
import { AuthContext } from '../contexts/Auth';
type SubmitProps = {
  name: string;
  email: string;
  password: string;
};


export default ({ navigation: { push } }: Props) => {
  const { signUp, setupUser } = useContext(AuthContext);

  const handleOnSubmit = ({ name, email, password }: SubmitProps) =>
    // Signup user by email and password
    signUp({ email, password })
      // update the user_metadata with the provided name
      .then(() => supabase.auth.updateUser({ data: { name } }))
      // setupUser for auth context after setting meta data
      .then(({ data: { user } }) => {
        if (user) {
          setupUser(user);
        }
      })
      // after successfully creating user and updating auth context
      // go to 'Feed' page
      .then(() => push('Home'))
      .catch(console.error);

  return (
    <Fill>
      <Text h1>Sign up</Text>
      <Form
        onSubmit={(res) => handleOnSubmit(res as SubmitProps)}
        fields={[
          { title: 'Name', type: 'name' },
          { title: 'Email', type: 'email' },
          { title: 'Password', type: 'password' }
        ]}
        Buttons={
          <Button type='clear' title={'Log in'} onPress={() => push('Login')} />
        }
      />
    </Fill>
  );
};
