import { Fill, Loading } from '../components';
import { TabProps } from './Home';
import { useGetPolls } from '../hooks/polls';
import PollsView from '../components/PollsView';

export default ({ navigation: { jumpTo } }: TabProps) => {
  const { data: polls, isLoading } = useGetPolls();

  if (polls && !isLoading)
    return (
      <Fill>
        <PollsView polls={polls} jumpTo={jumpTo} />
      </Fill>
    );
  else return <Loading />;
};
