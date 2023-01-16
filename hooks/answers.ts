import { PostgrestError } from '@supabase/supabase-js';
import { Alert } from 'react-native';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { supabase } from '../api/supabase';

export type SignInPayload = { email: string; password: string };

export const handleError = (error: PostgrestError | null) => {
  if (error) Alert.alert('Authentication Error', error.message);
};

export const useGetUserAnswer = ({
  poll_id,
  user_id
}: {
  poll_id?: string;
  user_id?: string;
}) =>
  useQuery('getUserAnswer', async () => {
    if (!user_id || !poll_id) return false;
    const { data } = await supabase
      .from('answers')
      .select()
      .eq('poll_id', poll_id)
      .eq('user_id', user_id)
      .single();

    return data;
  });

export const useGetAnswers = () =>
  useQuery('getAnswers', async () => {
    const { data } = await supabase.from('answers').select();
    return data;
  });

export const useSetAnswer = (refetch: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      user_id,
      poll_id,
      option_id,
      answer_id
    }: {
      user_id: string;
      poll_id: string;
      option_id: string;
      answer_id?: string;
    }) => {
      const { error } = await supabase
        .from('answers')
        .upsert({ id: answer_id, user_id, poll_id, option_id });
      if (error) {
        handleError(error);
        throw error;
      }
    },
    {
      onSuccess: () => refetch()
    }
  );
};
