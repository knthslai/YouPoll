import React, {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useState
} from 'react';

export interface PollContextProps {
  pollId?: string;
  setPollId: Dispatch<SetStateAction<string | undefined>>;
}
export const PollContext = createContext<PollContextProps>({
  setPollId: () => {}
});

// PollContext goals:
// - set currently viewing poll
export const PollContextProvider: FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [pollId, setPollId] = useState<string | undefined>();

  return (
    <PollContext.Provider value={{ pollId, setPollId }}>
      {children}
    </PollContext.Provider>
  );
};
