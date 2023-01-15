import moment from 'moment';
import { useContext } from 'react';
import { Fill, Loading, Row } from '../components';
import Card from '../components/Card';
import { PollContext } from '../contexts/Poll';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { TabProps } from './Home';
import { useGetUser } from '../hooks/Users';
import { useGetPolls } from '../hooks/Polls';

export default ({ navigation: { jumpTo } }: TabProps) => {
  const { data: polls, isLoading } = useGetPolls();
  const { setPollId } = useContext(PollContext);
  const { data: user } = useGetUser();

  const handleOnPress = (pollId: string) => {
    setPollId(pollId);
    jumpTo('Poll');
  };
  if (isLoading) return <Loading />;
  else
    return (
      <Fill>
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
      </Fill>
    );
};
