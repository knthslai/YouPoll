import { useContext, useState } from 'react';
import { Fill, Form, Row } from '../components';
import Card from '../components/Card';
import { AuthContext, UserProps } from '../contexts/Auth';
import { PollContext, PollProps } from '../contexts/Poll';
import { Button, FAB, Icon, Text } from '@rneui/themed';
import { InputTypeProps } from '../components/Form.parts';
import { StyleProp, View, ViewStyle } from 'react-native';
import { supabase } from '../api/supabase';

export const PollView = () => {
  const { poll, setPollId } = useContext(PollContext);
  const { question, options }: PollProps = poll!;

  return (
    <Fill>
      <Card title={'Poll'}>
        <Text h3>{question}</Text>
        {options.map(({ text }, idx) => (
          <Text key={`${text}${idx}`}>{text}</Text>
        ))}
      </Card>
      <View style={{ position: 'absolute', right: 40, bottom: 20 }}>
        <FAB
          icon={{ name: 'add', color: 'white' }}
          color='turquoise'
          onPress={() => setPollId(undefined)}
        />
      </View>
    </Fill>
  );
};

type PollFormProps = {
  [key: string]: string;
} & { question: string };

export const NewPoll = () => {
  const { user } = useContext(AuthContext);
  const { id: user_id } = user as UserProps;
  const { setPollId } = useContext(PollContext);
  const [options, setOptions] = useState<InputTypeProps[]>([
    { title: 'Question', type: 'text' },
    { title: 'Option 1' },
    { title: 'Option 2' },
    { title: 'Option 3' }
  ]);

  const handleOnSubmit = (payload: PollFormProps) => {
    const [question, ...options] = Object.keys(payload)
      .map((k) => payload[k])
      .filter((v) => v);
    //create question
    supabase
      .from('polls')
      .insert([{ user_id, question }])
      .select()
      .then(({ data, error }) => {
        if (error)
          console.error('🚀 ~ file: Poll.parts.tsx:53 ~ .then ~ ,error', error);
        if (data) {
          const [newPoll] = data! as PollProps[];
          const { id: poll_id } = newPoll;
          // create each option with poll_id
          return (
            supabase
              .from('options')
              .insert(options.map((text) => ({ text, poll_id })))
              // set PollView to view created poll
              .then(() => {
                setPollId(poll_id);
              })
          );
        }
      });
  };

  const addOption = () =>
    setOptions((prev) => {
      // builds next option by destructuring
      // last option title
      const { title } = prev[prev.length - 1];
      const [_, num] = title.split(' ');
      return [
        ...prev,
        // and increasing the numerical value by 1
        { title: title.replace(num, (parseInt(num) + 1).toString()) }
      ];
    });

  const removeOption = () => {
    // Only remove options if length is above 4
    // minimum 3 options
    if (options.length > 4)
      setOptions((prev) => {
        const newOptions = [...prev];
        newOptions.pop();
        return newOptions;
      });
  };

  const buttonStyle: StyleProp<ViewStyle> = { width: 42, borderRadius: 8 };
  return (
    <Fill>
      <Text h1 style={{ alignSelf: 'center' }}>
        New Poll
      </Text>
      <Form
        style={{ maxHeight: 600 }}
        onSubmit={(res) => handleOnSubmit(res as PollFormProps)}
        fields={options}
        Buttons={
          <Row>
            <Button
              // Disable removeOption if min 3 options
              disabled={options.length <= 4}
              color='error'
              icon={<Icon name='remove-outline' type='ionicon' color='white' />}
              buttonStyle={buttonStyle}
              onPress={removeOption}
            />
            <Text h4 style={{ marginLeft: 6, marginRight: 6 }}>
              Option
            </Text>
            <Button
              icon={<Icon name='add-outline' type='ionicon' color='white' />}
              buttonStyle={buttonStyle}
              onPress={addOption}
            />
          </Row>
        }
      />
    </Fill>
  );
};
