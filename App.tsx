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
import { AnimatedBG } from './components';

const theme = createTheme({
  lightColors: {},
  darkColors: {}
});

type StackPresentationTypes =
  | 'card'
  | 'modal'
  | 'transparentModal'
  | 'containedModal'
  | 'containedTransparentModal'
  | 'fullScreenModal'
  | 'formSheet'
  | undefined;

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
        <AnimatedBG>
          <NavigationContainer
            theme={{
              dark: true,
              colors: {
                primary: 'transparent',
                background: 'transparent',
                card: 'transparent',
                text: 'black',
                border: 'transparent',
                notification: 'transparent'
              }
            }}
          >
            <Stack.Navigator
              screenOptions={{ animation: 'fade', presentation: 'card' }}
            >
              <Stack.Screen
                name='Landing'
                options={{
                  headerTitle: 'YouPoll'
                }}
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
        </AnimatedBG>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
