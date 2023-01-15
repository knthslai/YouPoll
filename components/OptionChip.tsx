import { CheckBox, Chip, withTheme } from '@rneui/themed';
import { GestureResponderEvent } from 'react-native';

const Chips = ({
  title,
  selected,
  color,
  onPress
}: {
  title: string;
  selected: boolean;
  color: string;
  onPress: (event: GestureResponderEvent) => void;
}) => {
  return (
    <Chip
      title={title}
      icon={
        <CheckBox
          checked={selected}
          size={28}
          checkedColor='white'
          uncheckedColor='white'
          containerStyle={{ backgroundColor: 'transparent' }}
        />
      }
      onPress={onPress}
      iconRight
      color={color}
      titleStyle={{
        fontSize: 24,
        fontWeight: '600'
      }}
      containerStyle={{
        margin: 16,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        shadowColor: '#000',
        shadowOffset: {
          width: 10,
          height: 12
        },
        shadowOpacity: 1,
        shadowRadius: 16.0,
        elevation: 24
      }}
    />
  );
};

export default withTheme(Chips, '');
