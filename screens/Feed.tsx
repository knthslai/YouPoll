import { Text, Button } from '@rneui/themed';
import { Props } from '../App';
import { Fill } from '../components';

export default ({ navigation: { push } }: Props) => {
  return (
    <Fill>
      <Text h1>Feed</Text>
      <Button onPress={() => push('Settings')} title={'Settings'} />
    </Fill>
  );
};
