import { useMutation, useQuery, useQueryClient } from 'react-query';
import { supabase } from '../api/supabase';
import { PollFormPayload } from '../screens/Create';

export const useGetPolls = () =>
  useQuery('polls', async () => {
    // By pulling in relational table data from 'answers'
    // - this helps provide in the "Feed"/"Poll" view
    //    poll infos like total votes and whether the
    //    user has already voted
    const { data } = await supabase.from('polls').select('*, answers(*)');
    return data;
  });

export const useGetPrevPolls = (ids: string[]) =>
  // same as line:5 useGetPolls however
  // they will only apply to the provided ids
  // used in "Poll" view's "Recently visited polls"
  useQuery([...ids], async () => {
    const { data } = await supabase
      .from('polls')
      .select('*, answers(*)')
      .in('id', ids);
    return data;
  });

export const useGetSinglePoll = (poll_id?: string) => {
  const queryClient = useQueryClient();
  return useQuery(['polls', poll_id], async () => {
    if (!poll_id) return false;
    const { data, error } = await supabase
      .from('polls')
      // Grab relation data from 'option' and 'answers'
      // to calculate total and selected answer
      .select('*, options(*, answers(*))')
      .eq('id', poll_id)
      .single();
    if (error) {
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
        throw error;
      }

      if (created_poll) {
        const { id: poll_id } = created_poll;
        // create each option with poll_id
        const { error } = await supabase
          .from('options')
          .insert(options.map((text: string) => ({ text, poll_id })));
        if (error) {
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

// The only way to invalidate polls react queries
// whenever live updates of any and all polls are created
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
