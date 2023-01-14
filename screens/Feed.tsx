import { Text } from '@rneui/themed';
import { Props } from '../App';
import { Fill } from '../components';
import Card from '../components/Card';

export default ({ navigation: { push } }: Props) => {
  return (
    <Fill>
      <Card title='Feed'>
        <Text h1>Content</Text>
      </Card>
    </Fill>
  );
};
