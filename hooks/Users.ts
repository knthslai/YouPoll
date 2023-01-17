import { AuthError } from '@supabase/supabase-js';
import { Alert } from 'react-native';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { supabase } from '../api/supabase';
import { SubmitProps } from '../screens/Signup';

export type SignInPayload = { email: string; password: string };

export const handleError = (error: AuthError | null) => {
  if (error) Alert.alert('Authentication Error', error.message);
};

export const useGetUser = () =>
  // REQ: use React querys to invalidate 'user' on sign/in/up/out
  useQuery('user', async () => {
    const { data } = await supabase.auth.getUser();
    return data?.user;
  });

export const useSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (payload: SignInPayload) => {
      const { error } = await supabase.auth.signInWithPassword(payload);
      if (error) {
        handleError(error);
        throw error;
      }
      return payload;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user');
      }
    }
  );
};

export const useSignUp = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (payload: SubmitProps) => {
      const { error } = await supabase.auth.signUp(payload);
      if (error) {
        handleError(error);
        throw error;
      }
      return payload;
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries('user');
      }
    }
  );
};

export const useLogOut = () => {
  const queryClient = useQueryClient();
  return useMutation(() => supabase.auth.signOut(), {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
      queryClient.removeQueries();
    }
  });
};