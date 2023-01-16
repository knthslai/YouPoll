import { PostgrestError } from '@supabase/supabase-js';
import { Alert } from 'react-native';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { supabase } from '../api/supabase';
import { PollFormPayload } from '../screens/Create';


  export type SignInPayload = { email: string; password: string };

  export const handleError = (error: PostgrestError | null) => {
    if (error) Alert.alert('Authentication Error', error.message);
  };

  export const useGetPolls = () =>
    useQuery('polls', async () => {
      const { data } = await supabase.from('polls').select();
      return data;
    });

  export const useGetPrevPolls = (ids: string[]) =>
    useQuery([...ids], async () => {
      const { data } = await supabase.from('polls').select().in('id', ids);
      return data;
    });

  export const useGetSinglePoll = (poll_id?: string) => {
    const queryClient = useQueryClient();
    return useQuery(['polls', poll_id], async () => {
      if (!poll_id) return false;
      const { data, error } = await supabase
        .from('polls')
        .select('*, options(*, answers(*))')
        .eq('id', poll_id)
        .single();
      if (error) {
        handleError(error);
        throw error;
      }
      queryClient.invalidateQueries(['getUserAnswer', poll_id]);
      return data;
    });
  };

  export const useCreatePoll = (onSuccess: (arg0: string) => void) => {
    return useMutation(
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
  };

  export const subscribeToPolls = () => {
    const queryClient = useQueryClient();
    return supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'polls' },
        () => {
          queryClient.invalidateQueries('polls');
        }
      )
      .subscribe();
  };
