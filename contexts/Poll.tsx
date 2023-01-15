import React, {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState
} from 'react';
import { supabase } from '../api/supabase';

export type OptionProps = {
  created_at: string;
  id: string;
  poll_id: string;
  text: string;
};

export type PollProps = {
  created_at: string;
  id: string;
  question: string;
  user_id: string;
  options: OptionProps[];
};
export interface PollContextProps {
  poll?: PollProps;
  pollId?: string;
  setPoll: Dispatch<SetStateAction<PollProps | undefined>>;
  setPollId: Dispatch<SetStateAction<string | undefined>>;
}
export const PollContext = createContext<PollContextProps>({
  setPoll: () => {},
  setPollId: () => {}
});

// PollContext goals:
// - set currently viewing poll
// - use react query to sub to any poll changes
export const PollContextProvider: FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [pollId, setPollId] = useState<string | undefined>(
    '2a531660-8157-4be3-880c-36871512b464'
  );
  const [poll, setPoll] = useState<PollProps | undefined>();
  useEffect(() => {
    if (pollId && (!poll || poll.id !== pollId))
      supabase
        .from('polls')
        .select('*, options(*)')
        .eq('id', pollId)
        .then(({ data, error }) => {
          if (error)
            console.error(
              '🚀 ~ file: Poll.tsx:47 ~ supabase.from ~ error',
              error
            );
          if (data) setPoll(data[0] as PollProps);
        });
  }, [pollId, poll]);
  return (
    <PollContext.Provider value={{ poll, setPoll, pollId, setPollId }}>
      {children}
    </PollContext.Provider>
  );
};
