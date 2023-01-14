import { Theme } from '@rneui/base';
import { Card, CardProps, Text } from '@rneui/themed';
import { ReactNode, RefAttributes, PropsWithChildren } from 'react';
export default ({
  title,
  children,
  ...props
}: JSX.IntrinsicAttributes &
  CardProps & { theme?: Theme | undefined; children?: ReactNode } & {
    children?: ReactNode;
  } & RefAttributes<
    PropsWithChildren<
      CardProps & { theme?: Theme | undefined; children?: ReactNode }
    >
  > & { title?: string }) => (
  <Card
    containerStyle={{
      borderRadius: 16,
      padding: 8,
      margin: 8,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    }}
    {...props}
  >
    {!!title && (
      <Text h2 style={{ alignSelf: 'center' }}>
        {title}
      </Text>
    )}
    {!!title && <Card.Divider />}
    {children}
  </Card>
);
