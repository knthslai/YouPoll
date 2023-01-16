import { useContext } from 'react';
import { Fill, OptionChip } from '../components';
import Card from '../components/Card';
import { PollContext } from '../contexts/Poll';
import { Chip, Text } from '@rneui/themed';
import { ScrollView, View } from 'react-native';
import { OptionAnswerProps, randOptionColor } from '../constants';
import { useGetUser } from '../hooks/users';
import { useGetPrevPolls, useGetSinglePoll } from '../hooks/polls';
import { TabProps } from './Home';
import { AnswerProp, OptionProp } from '../types/supabase';
import { useGetUserAnswer, useSetAnswer } from '../hooks/answers';
import { Props } from '../App';
import { AddPollButton } from './Poll.parts';
import PollsView from '../components/PollsView';

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
  const { data: poll, refetch } = useGetSinglePoll(pollId);
  const { mutate } = useSetAnswer(refetch);

  const handleOnPressAddPollButton = () => {
    setPollId(undefined);
    push('Create');
  };

  if (poll && user && pollId) {
    const { question, options } = poll;
    const total = (
      options as unknown as OptionProp & { answers: AnswerProp[] }[]
    ).reduce((total: number, { answers }) => total + answers.length, 0);

    const handleOnPress = async (option_id: string) => {
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
                  const selected = answers.some(({ id }) =>
                    answer ? id === answer?.id : false
                  );
                  return (
                    <OptionChip
                      onPress={() => handleOnPress(id)}
                      key={`${text}_${idx}`}
                      title={
                        answer && total
                          ? `${
                              showPercentage && percentage
                                ? `%${percentage} - `
                                : ''
                            }${text}`
                          : text
                      }
                      selected={selected}
                      color={colorNode.color}
                    />
                  );
                }
              )
            : null}
        </ScrollView>
        <View style={{ position: 'absolute', left: 40, bottom: 20 }}>
          <Chip
            iconRight
            icon={{ name: 'timer-outline', color: 'white', type: 'ionicon' }}
            color='orange'
            onPress={() => setPollId(undefined)}
            titleStyle={{ fontSize: 24, marginLeft: 8 }}
            containerStyle={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5
            }}
          >
            Previous
          </Chip>
        </View>
        <View style={{ position: 'absolute', right: 40, bottom: 20 }}>
          <AddPollButton onPress={handleOnPressAddPollButton} />
        </View>
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
          <AddPollButton onPress={handleOnPressAddPollButton} />
        </View>
      </Fill>
    );
};
