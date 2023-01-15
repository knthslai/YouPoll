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
        borderRadius: 16
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
