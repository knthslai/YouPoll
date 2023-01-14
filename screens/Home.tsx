import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from './Settings';
import FeedScreen from './Feed';
import PollScreen from './Poll';
import { Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();
export default () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName='Feed'
        screenOptions={{
          header: () => null,
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: 'rgba(0,0,0,0.3)',
          tabBarInactiveBackgroundColor: 'rgba(0,0,0,0)',
          tabBarActiveTintColor: 'white'
        }}
      >
        <Tab.Screen
          name='Feed'
          component={FeedScreen}
          options={{
            tabBarLabel: 'Feed',
            tabBarIcon: ({ color }) => (
              <Icon
                name='list-outline'
                type='ionicon'
                color={color}
                size={26}
              />
            )
          }}
        />
        <Tab.Screen
          name='Poll'
          component={PollScreen}
          options={{
            tabBarLabel: 'Poll',
            tabBarIcon: ({ color }) => (
              <Icon
                name='help-outline'
                type='ionicon'
                color={color}
                size={26}
              />
            )
          }}
        />
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
