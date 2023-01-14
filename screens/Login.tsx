import { Button, Text } from '@rneui/themed';
import { useContext } from 'react';
import { Props } from '../App';
import { Fill, Form } from '../components';
import { AuthContext, SignInPayload } from '../contexts/Auth';

// Login goal:
//  - Authenticate user
//    - Send to feed
//  - Allow sign up
export default ({ navigation: { push } }: Props) => {
  const { signIn } = useContext(AuthContext);

  const handleOnSubmit = (payload: SignInPayload) => {
    signIn(payload)
      .then(() => {
        push('Home');
      })
      .catch(console.error);
  };

  const handleSignup = () => push('Signup');

  return (
    <Fill>
      <Text h1>Login</Text>
      <Form
        onSubmit={(props) => handleOnSubmit(props as SignInPayload)}
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
