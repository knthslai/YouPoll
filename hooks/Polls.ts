import { PostgrestError } from '@supabase/supabase-js';
import { Alert } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import { supabase } from '../api/supabase';
import { PollFormPayload } from '../screens/Poll.parts';

export type SignInPayload = { email: string; password: string };

export const handleError = (error: PostgrestError | null) => {
  if (error) Alert.alert('Authentication Error', error.message);
};

export const useGetPolls = () =>
  useQuery('getPolls', async () => {
    const { data } = await supabase.from('polls').select();
    return data;
  });

export const useGetSinglePoll = (poll_id?: string) =>
  useQuery(['polls', poll_id], async () => {
    if (!poll_id) return false;
    const { data, error } = await supabase
      .from('polls')
      .select('*, options(*)')
      .eq('id', poll_id)
      .single();
    if (error) {
      handleError(error);
      throw error;
    }
    return data;
  });

export const useCreatePoll = (onSuccess: (poll_id: string) => void) =>
  useMutation(
    async ({ user_id, question, options }: PollFormPayload) => {
      //create question
      const { data: created_poll, error } = await supabase
        .from('polls')
        .insert([{ user_id, question }])
        .select()
        .single();

      if (error) {
        handleError(error);
        throw error;
      }

      if (created_poll) {
        const { id: poll_id } = created_poll;
        // create each option with poll_id
        const { error } = await supabase
          .from('options')
          .insert(options.map((text: string) => ({ text, poll_id })));
        if (error) {
          handleError(error);
          throw error;
        }
        return poll_id;
      }
      throw 'No Poll id';
    },
    {
      onSuccess
    }
  );
