import { useForm, SubmitHandler } from 'react-hook-form';
import { buildInput, InputTypeProps } from './Form.parts';
import { Fill, Row } from './Common';
import { Button, Card } from '@rneui/themed';
import { isEmpty } from 'lodash';

// Form component goal:
// - take in an array of fields to
//   quickly generate a react hook
//   form with inputs and validation
export default ({
  title,
  defaultValues = {},
  fields,
  onSubmit,
  buttonTitle = 'Submit',
  Buttons
}: {
  title?: string;
  defaultValues?: { [key: string]: string };
  fields: InputTypeProps[];
  onSubmit: SubmitHandler<{}>;
  buttonTitle?: string;
  Buttons?: JSX.Element;
}): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { isValid, touchedFields }
  } = useForm({ defaultValues, mode: 'onBlur' });
  return (
    <Card>
      {!!title && <Card.Title>{title}</Card.Title>}
      {!!title && <Card.Divider />}

      {/* Renders ever field prop */}
      {fields.map((field) => buildInput(field, control))}

      <Row>
        {/* Allows additional buttons */}
        {Buttons}
        <Fill />
        <Button
          // Checks all provided validation and if any field was touched
          disabled={!isValid && isEmpty(touchedFields)}
          title={buttonTitle}
          onPress={handleSubmit(onSubmit)}
        />
      </Row>
    </Card>
  );
};
