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
import { useGetUser } from '../hooks/users';
import { Props } from '../App';
import { Loading } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';

type Screens = 'Feed' | 'Poll' | 'Settings';

export type TabProps = BottomTabScreenProps<ParamListBase, Screens>;
const Tab = createBottomTabNavigator();
export default ({ navigation: { push } }: Props) => {
  const { data: user, isLoading } = useGetUser();
  const { pollId } = useContext(PollContext);
  if (!user && !isLoading) {
    push('Login');
    return <Loading />;
  } else
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Tab.Navigator
          initialRouteName={pollId ? 'Poll' : 'Feed'}
          screenOptions={{
            header: () => null,
            tabBarShowLabel: false,
            unmountOnBlur: true,
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
