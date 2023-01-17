import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from './Settings';
import FeedScreen from './Feed';
import PollScreen from './Poll';
import { useContext } from 'react';
import { PollContext } from '../contexts/Poll';
import { Props } from '../App.parts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { subscribeToPolls } from '../hooks/polls';
import {
  FeedTabOption,
  PollTabOption,
  screenOptions,
  SettingsTabOption
} from './Home.parts';

// Home page goals:
// - Sets view to have bottom tab navigation
// - Shows 'Feed' 'Poll' 'Settings' pages for logged in users
// - On create new poll, pollId is set with the recently created poll
//   - sets the initial route name for the tab nav to go to Poll view
export default ({ navigation: { push }, ...props }: Props) => {
  const Tab = createBottomTabNavigator();
  const { pollId } = useContext(PollContext);
  // Starts the subscription to "polls" table
  // - on any update, it will invalidate 'polls' queries to refetch
  subscribeToPolls();

  return (
    <SafeAreaView {...props} style={{ flex: 1 }}>
      <Tab.Navigator
        //   - sets the initial route name for the tab nav to go to Poll view
        initialRouteName={pollId ? 'Poll' : 'Feed'}
        screenOptions={screenOptions}
      >
        <Tab.Screen
          name='Feed'
          component={FeedScreen}
          options={FeedTabOption}
        />
        {/* Within the poll view, users can navigate to "Create" poll view
            -  since the navigation is coming from the props on "Home" page
              - included it in the props that tab navigator render "Poll" view
         */}
        <Tab.Screen name='Poll' options={PollTabOption(pollId)}>
          {(props: any & { push: Props['navigation']['push'] }) => (
            <PollScreen {...props} push={push} />
          )}
        </Tab.Screen>
        <Tab.Screen
          name='Settings'
          component={SettingsScreen}
          options={SettingsTabOption}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};
