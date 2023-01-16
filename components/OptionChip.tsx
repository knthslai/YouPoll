import { CheckBox, Chip, Text, withTheme } from '@rneui/themed';
import { GestureResponderEvent, View } from 'react-native';
import { Fill } from './Common';

const Chips = ({
  title,
  selected,
  color,
  onPress,
  percentage
}: {
  percentage?: string;
  title: string;
  selected: boolean;
  color: string;
  onPress: (event: GestureResponderEvent) => void;
}) => {
  return (
    <Chip
      onPress={onPress}
      color={color}
      titleStyle={{
        fontSize: 24,
        fontWeight: '600'
      }}
      containerStyle={{
        margin: 16,
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
      {!!percentage && (
        <View
          style={{
            borderRightColor: '#fff',
            borderRightWidth: 2,
            height: '100%',
            paddingRight: 8,
            marginRight: 6
          }}
        >
          <Text
            h4
            style={{
              fontWeight: '500',
              marginVertical: '50%'
            }}
          >
            {percentage}
          </Text>
        </View>
      )}
      <Fill>
        <Text h4 style={{ fontWeight: '500' }}>
          {title}
        </Text>
      </Fill>
      <CheckBox
        onPress={onPress}
        checked={selected}
        size={28}
        checkedColor='white'
        uncheckedColor='black'
        containerStyle={{ backgroundColor: 'transparent', padding: 0 }}
      />
    </Chip>
  );
};

export default withTheme(Chips, '');
