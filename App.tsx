import { createTheme, ThemeProvider } from '@rneui/themed';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from '@react-navigation/native-stack';
import {
  CreateScreen,
  HomeScreen,
  LandingScreen,
  LoginScreen,
  SignupScreen
} from './screens';
import { AnimatedBG } from './components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PollContextProvider } from './contexts/Poll';
import { QueryClient, QueryClientProvider } from 'react-query';

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

type Screens =
  | 'Landing'
  | 'Login'
  | 'Signup'
  | 'Feed'
  | 'Poll'
  | 'Settings'
  | 'Home'
  | 'Create';

export type Props = NativeStackScreenProps<ParamListBase, Screens>;
const Stack = createNativeStackNavigator();

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnMount: false,
        refetchOnWindowFocus: false
      }
    }
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
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
                    header: () => false
                  }}
                >
                  <Stack.Screen name='Landing' component={LandingScreen} />
                  <Stack.Screen name='Login' component={LoginScreen} />
                  <Stack.Screen name='Signup' component={SignupScreen} />
                  <Stack.Screen name='Home' component={HomeScreen} />
                  <Stack.Screen name='Create' component={CreateScreen} />
                </Stack.Navigator>
              </NavigationContainer>
            </SafeAreaView>
          </AnimatedBG>
        </PollContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
