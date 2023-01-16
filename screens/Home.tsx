import {
  BottomTabScreenProps,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import SettingsScreen from './Settings';
import FeedScreen from './Feed';
import PollScreen from './Poll';
import { Icon } from '@rneui/themed';
import { useContext } from 'react';
import { PollContext } from '../contexts/Poll';
import { ParamListBase } from '@react-navigation/native';
import { Props } from '../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import { subscribeToPolls } from '../hooks/polls';

type Screens = 'Feed' | 'Poll' | 'Settings';

export type TabProps = BottomTabScreenProps<ParamListBase, Screens>;
export default ({ navigation: { push }, ...props }: Props) => {
  const Tab = createBottomTabNavigator();
  const { pollId } = useContext(PollContext);
  subscribeToPolls();
return (
  <SafeAreaView {...props} style={{ flex: 1 }}>
    <Tab.Navigator
      initialRouteName={pollId ? 'Poll' : 'Feed'}
      screenOptions={{
        header: () => null,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: 'rgba(0,0,0,0.3)',
        tabBarInactiveBackgroundColor: 'rgba(0,0,0,0)',
        tabBarActiveTintColor: 'white',
        tabBarStyle: {
          paddingBottom: 0
        }
      }}
    >
      <Tab.Screen
        name='Feed'
        component={FeedScreen}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color }) => (
            <Icon name='list-outline' type='ionicon' color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name='Poll'
        options={{
          tabBarLabel: 'Poll',
          tabBarIcon: ({ color }) =>
            pollId ? (
              <Icon
                name='help-outline'
                type='ionicon'
                color={color}
                size={26}
              />
            ) : (
              <Icon
                name='add-circle-outline'
                type='ionicon'
                color={color}
                size={32}
              />
            )
        }}
      >
        {(props: any & { push: Props['navigation']['push'] }) => (
          <PollScreen {...props} push={push} />
        )}
      </Tab.Screen>
      <Tab.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <Icon
              name='settings-outline'
              type='ionicon'
              color={color}
              size={26}
            />
          )
        }}
      />
    </Tab.Navigator>
  </SafeAreaView>
);
};
