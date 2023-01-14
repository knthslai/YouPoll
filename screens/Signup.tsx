import { Button, Text } from '@rneui/themed';
import { supabase } from '../api/supabase';
import { Props } from '../App';
import { Fill, Form } from '../components';
type SubmitProps = {
  name: string;
  email: string;
  password: string;
};
export default ({ navigation: { push } }: Props) => {
  const handleOnSubmit = (payload: SubmitProps) => {
    supabase.auth.signUp(payload).then(({ data, error }) => {
      if (error)
        return console.error(
          '🚀 ~ file: Signup.tsx:13 ~ supabase.auth.signUp ~ error',
          error
        );
      if (data) {
        push('Feed');
      }
    });
  };
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
