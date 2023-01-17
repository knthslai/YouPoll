import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  CreateScreen,
  HomeScreen,
  LandingScreen,
  LoginScreen,
  SignupScreen
} from './screens';
import { Providers, navigatorTheme, screenOptions } from './App.parts';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Providers>
      {/* REQ: React Navigation */}
      <NavigationContainer theme={navigatorTheme}>
        <Stack.Navigator screenOptions={screenOptions}>
          {/* Initially loads Landing */}
          <Stack.Screen name='Landing' component={LandingScreen} />
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Signup' component={SignupScreen} />
          {/* Home view for logged in users */}
          <Stack.Screen name='Home' component={HomeScreen} />
          {/* Create new Poll view */}
          <Stack.Screen name='Create' component={CreateScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Providers>
  );
}
