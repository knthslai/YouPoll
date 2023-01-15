import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { supabase } from '../api/supabase';
import { Fill, Row } from '../components';
import Card from '../components/Card';
import { AuthContext } from '../contexts/Auth';
import { PollContext, PollProps } from '../contexts/Poll';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { TabProps } from './Home';

export default ({ navigation: { jumpTo } }: TabProps) => {
  const { setPollId } = useContext(PollContext);
  const { user } = useContext(AuthContext);
  const [polls, setPolls] = useState<PollProps[]>([]);

  useEffect(() => {
    supabase
      .from('polls')
      .select()
      .then(({ data }) => setPolls(data || []));
  }, []);

  const handleOnPress = (pollId: string) => {
    setPollId(pollId);
    jumpTo('Poll');
  };
  return (
    <Fill>
      <ScrollView>
        {polls.map(({ question, created_at, user_id, id }) => (
          <TouchableOpacity onPress={() => handleOnPress(id)}>
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
