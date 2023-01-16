import { useContext, useEffect } from 'react';
import { Fill, OptionChip, Row } from '../components';
import Card from '../components/Card';
import { PollContext } from '../contexts/Poll';
import { Chip, Icon, Text } from '@rneui/themed';
import { ScrollView, View } from 'react-native';
import { OptionAnswerProps, randOptionColor } from '../constants';
import { useGetUser } from '../hooks/users';
import { useGetPrevPolls, useGetSinglePoll } from '../hooks/polls';
import { TabProps } from './Home';
import { AnswerProp, OptionProp } from '../types/supabase';
import { Props } from '../App';
import { AddPollButton } from './Poll.parts';
import PollsView from '../components/PollsView';
import {
  subscribeToPollAnswers,
  useGetUserAnswer,
  useSetAnswer
} from '../hooks/answers';

export default ({
  navigation: { jumpTo },
  push
}: TabProps & { push: Props['navigation']['push'] }) => {
  const { data: user } = useGetUser();
  const { pollId, setPollId, viewedPolls } = useContext(PollContext);
  const { data: polls } = useGetPrevPolls(viewedPolls);
  const { data: answer } = useGetUserAnswer({
    user_id: user?.id,
    poll_id: pollId
  });

  const subbedInstance = subscribeToPollAnswers(pollId);

  const { data: poll } = useGetSinglePoll(pollId);
  const { mutate } = useSetAnswer();

  const handleOnPressAddPollButton = () => {
    setPollId(undefined);
    push('Create');
  };

  useEffect(() => {
    return () => {
      if (subbedInstance) subbedInstance.unsubscribe();
    };
  }, []);

  if (poll && user && pollId) {
    const { question, options } = poll;
    const total = (
      options as unknown as OptionProp & { answers: AnswerProp[] }[]
    ).reduce((total: number, { answers }) => total + answers.length, 0);

    const handleOnPress = (option_id: string) => {
      mutate({
        option_id,
        user_id: user.id,
        answer_id: answer ? answer?.id : undefined,
        poll_id: pollId
      });
    };
    return (
      <Fill>
        <Card title={'Poll'}>
          <Text h3>{question}</Text>
        </Card>
        <ScrollView>
          {options
            ? randOptionColor(options as OptionAnswerProps[]).map(
                ({ id, text, colorNode, answers }, idx) => {
                  const showPercentage = answer && total;
                  const percentage = Math.round((answers.length / total) * 100);
                  return (
                    <OptionChip
                      percentage={
                        answer && total && showPercentage && percentage
                          ? `%${percentage}`
                          : undefined
                      }
                      onPress={() => handleOnPress(id)}
                      key={`${text}_${idx}`}
                      title={text}
                      selected={id === answer?.option_id}
                      color={colorNode.color}
                    />
                  );
                }
              )
            : null}
        </ScrollView>
        <Row>
          <Chip
            iconRight
            icon={{ name: 'timer-outline', color: 'white', type: 'ionicon' }}
            color='orange'
            onPress={() => setPollId(undefined)}
            titleStyle={{ fontSize: 24, marginLeft: 8 }}
            containerStyle={{
              borderLeftColor: '#fff',
              borderLeftWidth: 1,
              borderTopColor: '#fff',
              borderTopWidth: 1,
              borderBottomColor: 'rgba(0,0,0,0.2)',
              borderBottomWidth: 1,
              borderRightColor: 'rgba(0,0,0,0.2)',
              borderRightWidth: 1,
              shadowColor: '#000',
              shadowOffset: {
                width: 10,
                height: 12
              },
              shadowOpacity: 1,
              shadowRadius: 16.0,
              elevation: 24
            }}
          >
            Previous
          </Chip>
          <Fill />
          <AddPollButton onPress={handleOnPressAddPollButton} />
        </Row>
      </Fill>
    );
  } else
    return (
      <Fill>
        {!!polls?.length && (
          <Text h4 style={{ alignSelf: 'center' }}>
            Previous Polls
          </Text>
        )}
        {!!polls?.length && <PollsView polls={polls} jumpTo={jumpTo} />}
        <View style={{ position: 'absolute', right: 40, bottom: 20 }}>
          <Row>
            {!polls?.length && <Text h4>Get started here </Text>}
            {!polls?.length && (
              <Icon
                name='arrow-forward-outline'
                type='ionicon'
                style={{ marginRight: 6 }}
              />
            )}
            <AddPollButton onPress={handleOnPressAddPollButton} />
          </Row>
        </View>
      </Fill>
    );
};
