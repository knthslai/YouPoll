import { createTheme, ThemeProvider } from '@rneui/themed';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from '@react-navigation/native-stack';
import {
  FeedScreen,
  LandingScreen,
  LoginScreen,
  PollScreen,
  SettingsScreen,
  SignupScreen
} from './screens';
import { AuthContextProvider } from './contexts/Auth';

const theme = createTheme({
  lightColors: {},
  darkColors: {}
});

type Screens = 'Landing' | 'Login' | 'Signup' | 'Feed' | 'Poll' | 'Settings';

export type Props = NativeStackScreenProps<ParamListBase, Screens>;

export default function App() {
  const Stack = createNativeStackNavigator();

  // Used to disable the back button when
  // - Landing -> Login
  // - Landing -> Feed
  const disabledBackProps = {
    headerTitle: 'YouPoll',
    headerBackButtonMenuEnabled: false,
    headerLeft: () => false
  };

  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name='Landing'
              options={{ headerTitle: 'YouPoll' }}
              component={LandingScreen}
            />
            <Stack.Screen
              name='Login'
              options={disabledBackProps}
              component={LoginScreen}
            />
            <Stack.Screen name='Signup' component={SignupScreen} />
            <Stack.Screen
              name='Feed'
              options={disabledBackProps}
              component={FeedScreen}
            />
            <Stack.Screen name='Poll' component={PollScreen} />
            <Stack.Screen name='Settings' component={SettingsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
