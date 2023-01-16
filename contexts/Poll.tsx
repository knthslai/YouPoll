import React, {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState
} from 'react';
import { useQueryClient } from 'react-query';

export interface PollContextProps {
  viewedPolls: string[];
  pollId?: string;
  setPollId: Dispatch<SetStateAction<string | undefined>>;
}
export const PollContext = createContext<PollContextProps>({
  viewedPolls: [],
  setPollId: () => {}
});

// PollContext goals:
// - set currently viewing poll
export const PollContextProvider: FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const queryClient = useQueryClient();
  const [viewedPolls, setViewedPoll] = useState<string[]>([]);
  const [pollId, setPollId] = useState<string | undefined>();
  useEffect(() => {
    if (pollId) {
      queryClient.refetchQueries('getUserAnswer');
      setViewedPoll((prev) => [...prev, pollId]);
    } else queryClient.removeQueries('getUserAnswer');
  }, [pollId]);
  return (
    <PollContext.Provider value={{ viewedPolls, pollId, setPollId }}>
      {children}
    </PollContext.Provider>
  );
};
