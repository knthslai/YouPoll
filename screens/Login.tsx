import { Button, Text } from '@rneui/themed';
import { Props } from '../App';
import { Fill, Form } from '../components';
import { SignInPayload, useGetUser, useSignIn } from '../hooks/Users';

// Login goal:
//  - Authenticate user
//    - Send to feed
//  - Allow sign up
export default ({ navigation: { push } }: Props) => {
  const { data: user } = useGetUser();
  const { mutate, isSuccess } = useSignIn();

  if (isSuccess && user) push('Home');

  console.log('🚀 ~ file: Login.tsx:35 ~ isSuccess', { isSuccess, user });
  const handleSignup = () => push('Signup');
  return (
    <Fill>
      <Text h1 style={{ alignSelf: 'center' }}>
        Login
      </Text>
      <Form
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
