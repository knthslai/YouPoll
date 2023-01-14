import { useForm, SubmitHandler } from 'react-hook-form';
import { buildInput, InputTypeProps } from './Form.parts';
import { Fill, Row } from './Common';
import { Button, Card } from '@rneui/themed';
import { camelCase } from 'lodash';

type FormProps = {
  title?: string;
  defaultValues?: { [key: string]: string };
  fields: InputTypeProps[];
  onSubmit: SubmitHandler<{}>;
  buttonTitle?: string;
  Buttons?: JSX.Element;
};

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
}: FormProps): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { isValid, dirtyFields }
  } = useForm({
    defaultValues,
    mode: 'onTouched'
  });
  // requiredFields checks if
  // - all required fields has been touched
  // returns a boolean
  const requiredFields = fields.every(({ title, required }) => {
    // checks if required
    // inputs default as 'required'
    // unless deliberately passing in false
    if (required !== false) {
      const key = camelCase(title);
      // checks if field has been touched
      return !!dirtyFields[key];
    }
    // defaults to true since not required
    return true;
  });

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
          // Disable form submit if
          // - not passing any form validations
          // - not every 'required' field was touched
          disabled={!isValid || !requiredFields}
          title={buttonTitle}
          onPress={handleSubmit(onSubmit)}
        />
      </Row>
    </Card>
  );
};
