import { Fill, Loading } from '../components';
import { TabProps } from './Home.parts';
import { useGetPolls } from '../hooks';
import PollsView from '../components/PollsView';
import { sortBy } from 'lodash';
import moment from 'moment';

// REQ: Feed page goals:
// - show all polls sorted by most recent
// - each feed:
//    - indicates total votes
//    - whether the user already voted on it
//    - poll question
//    - poll created "time ago"
export default ({ navigation: { jumpTo } }: TabProps) => {
  const { data: polls, isLoading } = useGetPolls();

  if (polls && !isLoading)
    return (
      <Fill>
        <PollsView
          polls={sortBy(
            polls,
            // convert date to UNIX and reverse sort
            ({ created_at }) => moment(created_at).valueOf() * -1
          )}
          jumpTo={jumpTo}
        />
      </Fill>
    );
  else return <Loading />;
};
