import { useContext, useState } from 'react';
import { Fill, Form, Loading, Row } from '../components';
import { Button, Icon, Text } from '@rneui/themed';
import { InputTypeProps } from '../components/Form.parts';
import {
  SafeAreaView,
  StyleProp,
  TouchableOpacity,
  ViewStyle
} from 'react-native';
import { PollContext } from '../contexts/Poll';
import { useCreatePoll } from '../hooks';
import { useGetUser } from '../hooks';
import { Props } from '../App.parts';

export type PollFormProps = {
  [key: string]: string;
};
export type PollFormPayload = {
  question: string;
  user_id: string;
  options: string[];
};

// Create poll page goals:
// - allows auth user to create a poll
// - polls requires a question and min. 2 options
//   - gives user the ability to add more than 2 options
// - after creating poll move to Poll view page with recently created poll
export default ({ navigation: { push } }: Props) => {
  const { data: user, isLoading } = useGetUser();
  const { setPollId } = useContext(PollContext);
  // onSuccess of newly created poll
  // send user to "Home"
  // and set viewing poll id
  const { mutate } = useCreatePoll((pollId: string) => {
    setPollId(pollId);
    push('Home');
  });
  // - polls requires a question and min. 2 options
  const [options, setOptions] = useState<InputTypeProps[]>([
    { title: 'Question', type: 'text' },
    { title: 'Option 1' },
    { title: 'Option 2' }
  ]);

  const handleOnSubmit = (payload: PollFormProps) => {
    const [question, ...options] = Object.keys(payload)
      .map((k) => payload[k])
      .filter((v) => v);
    mutate({ question, options, user_id: user!.id });
  };

  //   - gives user the ability to add more than 2 options
  const addOption = () =>
    setOptions((prev) => {
      // builds next option by destructuring
      // last option title
      const { title } = prev[prev.length - 1];
      const [_, num] = title.split(' ');
      return [
        ...prev,
        // and increasing the numerical value by 1
        {
          title: title.replace(num, (parseInt(num) + 1).toString()),
          required: false
        }
      ];
    });

  const removeOption = () => {
    // Only remove options if length is above 4
    // minimum 3 options
    if (options.length > 3)
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
      <SafeAreaView style={{ flex: 1 }}>
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
      </SafeAreaView>
    );
};
