import { useContext } from 'react';
import { PollContext } from '../contexts/Poll';
import { NewPoll, PollView } from './Poll.parts';

export default () => {
  const { poll, pollId } = useContext(PollContext);
  if (poll && pollId) return <PollView />;
  else return <NewPoll />;
};
