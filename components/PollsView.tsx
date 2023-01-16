import moment from 'moment';
import { useContext } from 'react';
import { Fill, Loading, Row } from '../components';
import Card from '../components/Card';
import { PollContext } from '../contexts/Poll';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

import { useGetUser } from '../hooks/users';
import { TabProps } from '../screens/Home';

export default ({
  jumpTo,
  polls
}: {
  jumpTo: TabProps['navigation']['jumpTo'];
  polls: {
    created_at: string | null;
    id: string;
    question: string;
    user_id: string;
  }[];
}) => {
  const { setPollId } = useContext(PollContext);
  const { data: user, isLoading } = useGetUser();

  const handleOnPress = (pollId: string) => {
    setPollId(pollId);
    jumpTo('Poll');
  };
  if (isLoading) return <Loading />;
  else
    return (
      <ScrollView>
        {polls!.map(({ question, created_at, user_id, id }) => (
          <TouchableOpacity key={id} onPress={() => handleOnPress(id)}>
            <Card title={question}>
              <Row>
                {user_id === user!.id && <Text>Yours</Text>}
                <Fill />
                <Text>{moment(created_at).fromNow()}</Text>
              </Row>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
};
