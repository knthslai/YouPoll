import { AnimatedBG } from './components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PollContextProvider } from './contexts/Poll';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StatusBar } from 'expo-status-bar';
import { FC } from 'react';
import { createTheme, ThemeProvider } from '@rneui/themed';
import { ParamListBase } from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  NativeStackScreenProps
} from '@react-navigation/native-stack';

const theme = createTheme({
  lightColors: {},
  darkColors: {}
});

export type Props = NativeStackScreenProps<ParamListBase, Screens>;
export type StackPresentationTypes =
  | 'card'
  | 'modal'
  | 'transparentModal'
  | 'containedModal'
  | 'containedTransparentModal'
  | 'fullScreenModal'
  | 'formSheet'
  | undefined;
export type Screens =
  | 'Landing'
  | 'Login'
  | 'Signup'
  | 'Feed'
  | 'Poll'
  | 'Settings'
  | 'Home'
  | 'Create';

export const Providers: FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        // to enforce proper query invalidations
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
            <StatusBar style='light' />
            <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
          </AnimatedBG>
        </PollContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export const navigatorTheme = {
  dark: true,
  colors: {
    primary: 'transparent',
    background: 'transparent',
    card: 'transparent',
    text: 'black',
    border: 'transparent',
    notification: 'transparent'
  }
};

export const screenOptions: NativeStackNavigationOptions = {
  animation: 'fade',
  presentation: 'card',
  headerTitle: 'YouPoll',
  headerBackButtonMenuEnabled: false,
  header: () => false
};
