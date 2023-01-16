import { Chip } from '@rneui/themed';

export const AddPollButton = ({ onPress }: { onPress: () => void }) => (
  <Chip
    icon={{ name: 'add', color: 'white' }}
    color='turquoise'
    onPress={onPress}
    titleStyle={{ fontSize: 24, marginRight: 8 }}
    containerStyle={{
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    }}
  >
    Add Poll
  </Chip>
);
