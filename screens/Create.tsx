import { useContext, useState } from 'react';
import { Fill, Form, Loading, Row } from '../components';
import { Button, Icon, Text } from '@rneui/themed';
import { InputTypeProps } from '../components/Form.parts';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { PollContext } from '../contexts/Poll';
import { useCreatePoll } from '../hooks/polls';
import { useGetUser } from '../hooks/users';
import { Props } from '../App';

export type PollFormProps = {
  [key: string]: string;
};
export type PollFormPayload = {
  question: string;
  user_id: string;
  options: string[];
};
export default ({ navigation: { push } }: Props) => {
  const { data: user, isLoading } = useGetUser();
  const { setPollId } = useContext(PollContext);
  const { mutate } = useCreatePoll((pollId) => {
    setPollId(pollId);
    push('Home');
  });
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
    mutate({ question, options, user_id: user!.id });
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

  if (isLoading) return <Loading />;
  else
    return (
      <Fill>
        <Row style={{ alignItems: 'flex-start' }}>
          <TouchableOpacity onPress={() => push('Home')}>
            <Row>
              <Icon name='caret-back-outline' type='ionicon' />
              <Text h4>Back</Text>
            </Row>
          </TouchableOpacity>
          <Fill />
        </Row>
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
                  icon={
                    <Icon name='remove-outline' type='ionicon' color='white' />
                  }
                  buttonStyle={buttonStyle}
                  onPress={removeOption}
                />
                <Text h4 style={{ marginLeft: 6, marginRight: 6 }}>
                  Option
                </Text>
                <Button
                  icon={
                    <Icon name='add-outline' type='ionicon' color='white' />
                  }
                  buttonStyle={buttonStyle}
                  onPress={addOption}
                />
              </Row>
            }
          />
        </Fill>
      </Fill>
    );
};