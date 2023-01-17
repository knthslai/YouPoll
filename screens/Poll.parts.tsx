import { Chip } from '@rneui/themed';
import { borderAndShadow } from '../components/OptionChip';

export const AddPollButton = ({ onPress }: { onPress: () => void }) => (
  <Chip
    icon={{ name: 'add', color: 'white' }}
    color='turquoise'
    onPress={onPress}
    titleStyle={{ fontSize: 24, marginRight: 8 }}
    containerStyle={borderAndShadow}
  >
    Add Poll
  </Chip>
);
