import { Theme } from '@rneui/base';
import { Card, CardProps, Text } from '@rneui/themed';
import { ReactNode, RefAttributes, PropsWithChildren } from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';
export default ({
  title,
  children,
  style,
  ...props
}: JSX.IntrinsicAttributes &
  CardProps & { theme?: Theme | undefined; children?: ReactNode } & {
    children?: ReactNode;
  } & RefAttributes<
    PropsWithChildren<
      CardProps & { theme?: Theme | undefined; children?: ReactNode }
    >
  > & { title?: string; style?: StyleProp<ViewStyle> }) => (
  <Card
    containerStyle={Object.assign(
      {
        borderRadius: 16,
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
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      style
    )}
    {...props}
  >
    <ScrollView>
      {!!title && (
        <Text h2 style={{ alignSelf: 'center' }}>
          {title}
        </Text>
      )}
      {!!title && <Card.Divider />}
      {children}
    </ScrollView>
  </Card>
);
