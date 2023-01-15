import { useContext } from 'react';
import { Fill, Loading, OptionChip } from '../components';
import Card from '../components/Card';
import { PollContext } from '../contexts/Poll';
import { FAB, Text } from '@rneui/themed';
import { View } from 'react-native';
import { NewPoll } from './Poll.parts';
import { randOptionColor } from '../constants';
import { supabase } from '../api/supabase';
import { useGetUser } from '../hooks/Users';
import { useCreatePoll, useGetSinglePoll } from '../hooks/Polls';
import { OptionProp } from '../types/supabase';
import { TabProps } from './Home';

export default (props: TabProps) => {
  const { data: user } = useGetUser();
  const { pollId, setPollId } = useContext(PollContext);
  const { data: poll } = useGetSinglePoll(pollId);
  const { mutate } = useCreatePoll(setPollId);

  if (!pollId && user)
    return <NewPoll {...props} mutate={mutate} user_id={user.id} />;
  else if (!poll || !pollId || !user) return <Loading />;
  else {
    const { question, options } = poll!;
    const handleOnPress = (option_id: string) =>
      supabase
        .from('answers')
        .insert({ user_id: user!.id, poll_id: pollId, option_id });
    return (
      <Fill>
        <Card title={'Poll'}>
          <Text h3>{question}</Text>
        </Card>
        {options
          ? randOptionColor(options as OptionProp[]).map(
              ({ id, text, colorNode }, idx) => (
                <OptionChip
                  onPress={() => handleOnPress(id)}
                  key={`${text}_${idx}`}
                  title={text}
                  selected={false}
                  color={colorNode.color}
                />
              )
            )
          : null}
        <View style={{ position: 'absolute', right: 40, bottom: 20 }}>
          <FAB
            icon={{ name: 'add', color: 'white' }}
            color='turquoise'
            onPress={() => setPollId(undefined)}
          />
        </View>
      </Fill>
    );
  }
};
