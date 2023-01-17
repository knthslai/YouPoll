import { Button, Text } from '@rneui/themed';
import { Props } from '../App.parts';
import { Fill, Form } from '../components';
import { useSignUp } from '../hooks/users';
export type SubmitProps = {
  email: string;
  password: string;
};

// Signup page goals:
// - use supabase auth to sign up users
// - on successful login move to Home page
export default ({ navigation: { push } }: Props) => {
  // - use supabase auth to sign up users
  const { mutate, isSuccess } = useSignUp();
  // - on successful login move to Home page
  if (isSuccess) push('Home');
  return (
    <Fill>
      <Text h1 style={{ alignSelf: 'center' }}>
        Sign up
      </Text>
      <Form
        onSubmit={(res) => mutate(res as SubmitProps)}
        fields={[
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
