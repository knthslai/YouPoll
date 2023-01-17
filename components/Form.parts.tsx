import { Input } from '@rneui/base';
import { Icon } from '@rneui/themed';
import { camelCase } from 'lodash';
import { useState } from 'react';
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps
} from 'react-hook-form';
import { Control, UseFormStateReturn } from 'react-hook-form/dist/types/form';

type FormStateValues = { [key: string]: string };

export type InputTypes = 'text' | 'password' | 'email' | 'name';

export type InputTypeProps = {
  type?: InputTypes;
  title: string;
  required?: boolean;
};

// buildInput Goal:
//  - generate react hook form inputs by passing in:
//    - type: 'text' | 'password' | 'email'
//    - title: "First name"
//  - with validation based on 'type'
export const buildInput = (
  { type = 'text', title, required = true }: InputTypeProps,
  control: Control<FormStateValues>
): JSX.Element => {
  const requirement: {
    [key: string]: string | { value: unknown; message: string };
  } = {};
  const cameledTitle = camelCase(title!);
  if (required) {
    requirement.required = `${title} is required`;
    switch (type) {
      case 'text':
        requirement.pattern = {
          value: /[a-zA-Z]/gm,
          message: 'Needs to contain letters'
        };
        requirement.minLength = {
          value: 3,
          message: 'Atleast 3 chars. long'
        };
        break;
      case 'password':
        requirement.pattern = {
          value: /[a-zA-Z]/gm,
          message: 'Needs to contain letters'
        };
        requirement.minLength = {
          value: 6,
          message: 'Atleast 6 chars. long'
        };
        break;
      case 'email':
        requirement.pattern = {
          value: /^\S+@\S+\.\S+$/,
          message: 'Not a valid email format'
        };
        break;
      case 'name':
        requirement.pattern = {
          value: /^[a-zA-Z]{3,} [a-zA-Z]{1,}/,
          message: 'Needs first and last name'
        };
        break;
    }
  }
  return (
    // - REQ: React hook form
    <Controller
      key={title}
      control={control}
      rules={requirement}
      render={(props) => (
        <RenderInput
          {...props}
          title={`${title}${required === false ? '' : ' *'}`}
          type={type}
        />
      )}
      name={cameledTitle}
    />
  );
};
type RenderProps = {
  field: ControllerRenderProps<FormStateValues, string>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FormStateValues>;
  title: string;
};

const RenderInput = (props: RenderProps & { type: string }) => {
  switch (props.type) {
    case 'password':
      return <PasswordInput {...props} />;
    default:
      return <TextInput {...props} />;
  }
};

const TextInput = ({
  field: { value, onChange, onBlur },
  fieldState,
  title
}: RenderProps) => (
  <Input
    onChangeText={(value) => onChange(value)}
    onBlur={onBlur}
    value={value}
    label={title}
    errorMessage={(fieldState.error?.message || '') as string}
  />
);

const PasswordInput = ({
  field: { value, onChange, onBlur },
  fieldState,
  title
}: RenderProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Input
      rightIcon={
        <Icon
          name={`eye-${showPassword ? 'off-' : ''}outline`}
          type='ionicon'
          size={20}
          onPress={() => setShowPassword((prev) => !prev)}
        />
      }
      onChangeText={(value) => onChange(value)}
      onBlur={onBlur}
      value={value}
      secureTextEntry={!showPassword}
      label={title}
      errorMessage={(fieldState.error?.message || '') as string}
    />
  );
};
