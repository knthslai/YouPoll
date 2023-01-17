import React, {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState
} from 'react';

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
// - temporarily store previously viewd polls
export const PollContextProvider: FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [viewedPolls, setViewedPoll] = useState<string[]>([]);
  const [pollId, setPollId] = useState<string | undefined>();

  useEffect(() => {
    if (pollId) {
      // - temporarily store previously viewd polls
      setViewedPoll((prev) => [...prev, pollId]);
    }
  }, [pollId]);

  return (
    <PollContext.Provider value={{ viewedPolls, pollId, setPollId }}>
      {children}
    </PollContext.Provider>
  );
};
