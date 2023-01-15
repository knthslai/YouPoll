import { createTheme, ThemeProvider } from '@rneui/themed';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from '@react-navigation/native-stack';
import {
  HomeScreen,
  LandingScreen,
  LoginScreen,
  SignupScreen
} from './screens';
import { AuthContextProvider } from './contexts/Auth';
import { AnimatedBG } from './components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PollContextProvider } from './contexts/Poll';

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
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <PollContextProvider>
          <AnimatedBG>
            <SafeAreaView style={{ flex: 1 }}>
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
                  screenOptions={{
                    animation: 'fade',
                    presentation: 'card',
                    headerTitle: 'YouPoll',
                    headerBackButtonMenuEnabled: false,
                    headerLeft: () => false
                  }}
                >
                  <Stack.Screen name='Landing' component={LandingScreen} />
                  <Stack.Screen name='Login' component={LoginScreen} />
                  <Stack.Screen name='Signup' component={SignupScreen} />
                  <Stack.Screen
                    name='Home'
                    component={HomeScreen}
                    options={{ header: () => false }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </SafeAreaView>
          </AnimatedBG>
        </PollContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
