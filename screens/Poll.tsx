import { useContext, useEffect } from 'react';
import { Fill, OptionChip, Row } from '../components';
import Card from '../components/Card';
import { PollContext } from '../contexts/Poll';
import { Chip, Icon, Text } from '@rneui/themed';
import { ScrollView, View } from 'react-native';
import { OptionAnswerProps, randOptionColor } from '../constants';
import { useGetUser } from '../hooks';
import { useGetPrevPolls, useGetSinglePoll } from '../hooks';
import { TabProps } from './Home.parts';
import { AnswerProp, OptionProp } from '../types/supabase';
import { Props } from '../App.parts';
import { AddPollButton } from './Poll.parts';
import PollsView from '../components/PollsView';
import {
  subscribeToPollAnswers,
  useGetUserAnswer,
  useSetAnswer
} from '../hooks';
import { borderAndShadow } from '../components/OptionChip';

// Poll screen goal:
// - Shows add poll button to redirect to "Create" page
// - Shows recently viewed polls
// - Shows selected poll from "Feed" or "Previously viewed"
export default ({
  navigation: { jumpTo },
  push
}: TabProps & { push: Props['navigation']['push'] }) => {
  const { pollId, setPollId, viewedPolls } = useContext(PollContext);
  // query for polls for previously viewedPolls
  const { data: polls } = useGetPrevPolls(viewedPolls);
  // query for currently viewing poll
  const { data: poll } = useGetSinglePoll(pollId);
  // query for user to create answer
  const { data: user } = useGetUser();
  const { mutate } = useSetAnswer();
  // query for answer user selected
  const { data: answer } = useGetUserAnswer({
    user_id: user?.id,
    poll_id: pollId
  });

  const subbedInstance = subscribeToPollAnswers(pollId);
  useEffect(() => {
    return () => {
      if (subbedInstance) subbedInstance.unsubscribe();
    };
  }, []);

  const handleOnPressAddPollButton = () => {
    setPollId(undefined);
    push('Create');
  };

  if (poll && user && pollId) {
    const { question, options } = poll;
    // Calculate total for each answers in each option
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
                  // Only display percentage only until after user selected
                  // to avoid selection bias
                  const showPercentage = answer && total;
                  // REQ: Calculate percentage
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
            containerStyle={borderAndShadow}
          >
            Previous
          </Chip>
          <Fill />
          <AddPollButton onPress={handleOnPressAddPollButton} />
        </Row>
      </Fill>
    );
  }
  // If no poll is selected
  // - show recently viewed
  // - "get started" message
  // - "Add poll" button
  else
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
