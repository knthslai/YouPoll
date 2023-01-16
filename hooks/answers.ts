import { useMutation, useQuery, useQueryClient } from 'react-query';
import { supabase } from '../api/supabase';

export type SignInPayload = { email: string; password: string };

export const useGetUserAnswer = ({
  poll_id,
  user_id
}: {
  poll_id?: string;
  user_id?: string;
}) =>
  useQuery(
    ['getUserAnswer', poll_id],
    async () => {
      const { data } = await supabase
        .from('answers')
        .select()
        .eq('poll_id', poll_id)
        .eq('user_id', user_id);
      console.log(
        '🚀 ~ file: Answers.ts:21 ~ data',
        data ? data[data.length - 1] : undefined
      );

      return data ? data[data.length - 1] : undefined;
    },
    { enabled: !!poll_id && !!user_id }
  );

export const useSetAnswer = () => {
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
      const { data, error } = await supabase
        .from('answers')
        .upsert({ id: answer_id, user_id, poll_id, option_id })
        .select()
        .maybeSingle();
      if (error) {
        throw error;
      } else if (!data) {
        throw 'No data';
      }
      return data;
    },
    {
      onSuccess: ({ poll_id }) => {
        queryClient.invalidateQueries(['getUserAnswer', poll_id]);
        queryClient.invalidateQueries(['polls', poll_id]);
      }
    }
  );
};

export const subscribeToPollAnswers = (poll_id?: string) => {
  if (!poll_id) return false;
  const queryClient = useQueryClient();
  return supabase
    .channel(`custom-${poll_id}-channel`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'answers',
        filter: `poll_id=eq.${poll_id}`
      },
      () => {
        queryClient.invalidateQueries(['getUserAnswer', poll_id]);
        queryClient.invalidateQueries(['polls', poll_id]);
      }
    )
    .subscribe();
};
