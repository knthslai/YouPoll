import { Fill, Loading } from '../components';
import { TabProps } from './Home';
import { useGetPolls } from '../hooks/polls';
import PollsView from '../components/PollsView';
import { sortBy } from 'lodash';
import moment from 'moment';

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
