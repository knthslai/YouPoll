import { Button, Text } from '@rneui/themed';
import { Props } from '../App.parts';
import { Fill, Form } from '../components';
import { SignInPayload, useGetUser, useSignIn } from '../hooks';

// Login goal:
//  - Authenticate user
//    - Send to feed
//  - Allow sign up
export default ({ navigation: { push } }: Props) => {
  const { data: user } = useGetUser();
  const { mutate, isSuccess } = useSignIn();
  // On useSignIn hook completes move to page 'Home'
  if (isSuccess && user) push('Home');

  const handleSignup = () => push('Signup');

  return (
    <Fill>
      <Text h1 style={{ alignSelf: 'center' }}>
        Login
      </Text>
      <Form
        // for default demo login use
        defaultValues={{ email: 'guest@email.com', password: 'Password1' }}
        onSubmit={(props) => mutate(props as SignInPayload)}
        fields={[
          { title: 'Email', type: 'email' },
          { title: 'Password', type: 'password' }
        ]}
        Buttons={
          <Button type='clear' title={'Sign up'} onPress={handleSignup} />
        }
      />
    </Fill>
  );
};
