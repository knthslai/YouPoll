import { Button, Text } from '@rneui/themed';
import { supabase } from '../api/supabase';
import { Props } from '../App';
import { Fill, Form } from '../components';
type SubmitProps = {
  email: string;
  password: string;
};
export default ({ navigation: { push } }: Props) => {
  const handleOnSubmit = (payload: SubmitProps) => {
    supabase.auth.signInWithPassword(payload).then(({ data, error }) => {
      if (error)
        return console.error(
          '🚀 ~ file: Login.tsx:11 ~ supabase.auth.signUp ~ error',
          error
        );
      if (data) {
        push('Feed');
      }
    });
  };
  return (
    <Fill>
      <Text h1>Login</Text>
      <Form
        onSubmit={(props) => handleOnSubmit(props as SubmitProps)}
        fields={[
          { title: 'Email', type: 'email' },
          { title: 'Password', type: 'password' }
        ]}
        Buttons={
          <Button
            type='clear'
            title={'Sign up'}
            onPress={() => push('Signup')}
          />
        }
      />
    </Fill>
  );
};
