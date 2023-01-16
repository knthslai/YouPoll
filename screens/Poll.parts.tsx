import { Chip } from '@rneui/themed';

export const AddPollButton = ({ onPress }: { onPress: () => void }) => (
  <Chip
    icon={{ name: 'add', color: 'white' }}
    color='turquoise'
    onPress={onPress}
    titleStyle={{ fontSize: 24, marginRight: 8 }}
    containerStyle={{
      borderLeftColor: '#fff',
      borderLeftWidth: 1,
      borderTopColor: '#fff',
      borderTopWidth: 1,
      borderBottomColor: 'rgba(0,0,0,0.2)',
      borderBottomWidth: 1,
      borderRightColor: 'rgba(0,0,0,0.2)',
      borderRightWidth: 1,
      shadowColor: '#000',
      shadowOffset: {
        width: 10,
        height: 12
      },
      shadowOpacity: 1,
      shadowRadius: 16.0,
      elevation: 24
    }}
  >
    Add Poll
  </Chip>
);
