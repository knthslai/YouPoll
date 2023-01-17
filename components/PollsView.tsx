import moment from 'moment';
import { useContext } from 'react';
import { Fill, Loading, Row } from '../components';
import Card from '../components/Card';
import { PollContext } from '../contexts/Poll';
import { ScrollView, TouchableOpacity } from 'react-native';

import { useGetUser } from '../hooks/users';
import { TabProps } from '../screens/Home.parts';
import { Icon, Text } from '@rneui/themed';

export default ({
  jumpTo,
  polls
}: {
  jumpTo: TabProps['navigation']['jumpTo'];
  polls: PollsAnswerProp;
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
        {polls.map(({ question, created_at, user_id, id, answers }) => {
          const typedAnswers = answers as PollAnswersProp;
          const total = typedAnswers.length;

          const answered = user
            ? typedAnswers.some(({ user_id }) => user_id === user.id)
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
export type PollAnswersProp = {
  created_at: string | null;
  id: string;
  option_id: string;
  poll_id: string;
  user_id: string;
}[];

export type PollsAnswerProp = ({
  created_at: string | null;
  id: string;
  question: string;
  user_id: string;
} & {
  answers:
    | {
        created_at: string | null;
        id: string;
        option_id: string;
        poll_id: string;
        user_id: string;
      }
    | PollAnswersProp
    | null;
})[];