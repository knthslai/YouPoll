import {
  BottomTabNavigationOptions,
  BottomTabScreenProps
} from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import { ParamListBase, RouteProp } from '@react-navigation/native';

export type Screens = 'Feed' | 'Poll' | 'Settings';

export type TabProps = BottomTabScreenProps<ParamListBase, Screens>;

export const screenOptions: BottomTabNavigationOptions = {
  header: () => null,
  tabBarShowLabel: false,
  tabBarActiveBackgroundColor: 'rgba(0,0,0,0.3)',
  tabBarInactiveBackgroundColor: 'rgba(0,0,0,0)',
  tabBarActiveTintColor: 'white',
  tabBarStyle: {
    paddingBottom: 0
  }
};

type TabOptionProps =
  | BottomTabNavigationOptions
  | ((props: {
      route: RouteProp<ParamListBase, Screens>;
      navigation: any;
    }) => BottomTabNavigationOptions);

export const FeedTabOption: TabOptionProps = {
  tabBarLabel: 'Feed',
  tabBarIcon: ({ color }) => (
    <Icon name='list-outline' type='ionicon' color={color} size={26} />
  )
};

export const PollTabOption = (pollId?: string): TabOptionProps => ({
  tabBarLabel: 'Poll',
  tabBarIcon: ({ color }) =>
    pollId ? (
      <Icon name='help-outline' type='ionicon' color={color} size={26} />
    ) : (
      <Icon name='add-circle-outline' type='ionicon' color={color} size={32} />
    )
});

export const SettingsTabOption: TabOptionProps = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ color }) => (
    <Icon name='settings-outline' type='ionicon' color={color} size={26} />
  )
};
