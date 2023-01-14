import { makeStyles } from '@rneui/themed';
import { View, ViewProps } from 'react-native';

const useStyles = makeStyles((theme) => ({
  flex: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

type PropsType = JSX.IntrinsicAttributes &
  JSX.IntrinsicClassAttributes<View> &
  Readonly<ViewProps>;

export const Fill = (props: PropsType): JSX.Element => {
  const styles = useStyles();
  return <View style={{ ...styles.flex, flex: 1 }} {...props} />;
};

export const Column = (props: PropsType): JSX.Element => {
  const styles = useStyles();
  return (
    <View
      style={{ ...styles.flex, flexDirection: 'column', height: '100%' }}
      {...props}
    />
  );
};

export const Row = (props: PropsType): JSX.Element => {
  const styles = useStyles();
  return (
    <View
      style={{ ...styles.flex, flexDirection: 'row', width: '100%' }}
      {...props}
    />
  );
};
