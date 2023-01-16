import { Button, Text } from '@rneui/themed';
import { Props } from '../App';
import { Fill, Form } from '../components';
import { useSignUp } from '../hooks/users';
export type SubmitProps = {
  name: string;
  email: string;
  password: string;
};

export default ({ navigation: { push } }: Props) => {
  const { mutate, isSuccess } = useSignUp();
  if (isSuccess) push('home');
  return (
    <Fill>
      <Text h1 style={{ alignSelf: 'center' }}>
        Sign up
      </Text>
      <Form
        onSubmit={(res) => mutate(res as SubmitProps)}
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
