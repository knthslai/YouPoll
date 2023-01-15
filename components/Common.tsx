import { makeStyles } from '@rneui/themed';
import {
  ActivityIndicator,
  StyleProp,
  View,
  ViewProps,
  ViewStyle
} from 'react-native';

const useStyles = makeStyles((theme) => ({
  flex: {
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

type PropsType = JSX.IntrinsicAttributes &
  JSX.IntrinsicClassAttributes<View> &
  Readonly<ViewProps> & { style?: StyleProp<ViewStyle> };

export const Fill = (props: PropsType): JSX.Element => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 8
      }}
      {...props}
    />
  );
};

export const Column = (props: PropsType): JSX.Element => {
  const styles = useStyles();
  return (
    <View style={{ ...styles.flex, flexDirection: 'column' }} {...props} />
  );
};

export const Row = ({ style, ...props }: PropsType): JSX.Element => {
  const styles = useStyles();
  return (
    <View
      style={{
        ...styles.flex,
        flexDirection: 'row'
      }}
      {...props}
    />
  );
};

export const Loading = () => <ActivityIndicator size='large' />;
