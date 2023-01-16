import moment from 'moment';
import { useContext } from 'react';
import { Fill, Loading, Row } from '../components';
import Card from '../components/Card';
import { PollContext } from '../contexts/Poll';
import { ScrollView, TouchableOpacity } from 'react-native';

import { useGetUser } from '../hooks/users';
import { TabProps } from '../screens/Home';
import { OptionProp, AnswerProp } from '../types/supabase';
import { Icon, Text } from '@rneui/themed';

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
    options: OptionProp & { answers: AnswerProp[] }[];
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
        {polls!.map(({ question, created_at, user_id, id, options }) => {
          const total = options.reduce(
            (total: number, { answers }) => total + answers.length,
            0
          );

          const answered = user
            ? options.some(({ answers }) =>
                answers.some(({ user_id }) => user_id === user.id)
              )
            : false;
          return (
            <TouchableOpacity key={id} onPress={() => handleOnPress(id)}>
              <Card
                title={question}
                style={{
                  backgroundColor: answered ? 'rgba(255,255,255,0.6)' : 'white'
                }}
              >
                <Row>
                  <Row>
                    <Icon
                      name='bar-chart-outline'
                      type='ionicon'
                      style={{ marginRight: 2 }}
                    />
                    {!!total && (
                      <Text>{`${total} votes ${
                        answered ? '(Inc. you)' : ''
                      }`}</Text>
                    )}
                  </Row>
                  <Fill />
                  <Row>
                    <Icon
                      name='timer-outline'
                      type='ionicon'
                      style={{ marginRight: 2 }}
                    />
                    <Text>{moment(created_at).fromNow()}</Text>
                  </Row>
                </Row>
              </Card>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
};
