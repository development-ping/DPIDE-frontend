import { useState } from 'react';
import { ErrorMessage, Inputbox, InputContent, InputWrapper } from './Input.style';
import { FieldError, UseFormRegister } from 'react-hook-form';
import eyeOn from '../../../../public/images/eye-light-on.png';
import eyeOff from '../../../../public/images/eye-light-off.png';

interface FormInput {
  email: string;
  password: string;
}

interface Props {
  placeholder: string;
  name: keyof FormInput;
  register: UseFormRegister<FormInput>;
  errors: FieldError | undefined;
}

const Input = ({ placeholder, name, register, errors }: Props) => {
  const [passwordState, setPasswordState] = useState(false);

  const onEyeClickHandler = () => {
    setPasswordState(!passwordState);
  };

  const pattern =
    name === 'email'
      ? {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          message: '올바른 이메일 주소를 입력해주세요.',
        }
      : {
          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          message: '비밀번호는 최소 8자 이상이며, 문자와 숫자를 포함해야 합니다.',
        };

  const required = name === 'email' ? '이메일을 입력해주세요.' : '비밀번호를 입력해주세요.';

  const renderErrorMessage = () => {
    if (!errors) return null;

    switch (errors.type) {
      case 'required':
        return errors.message;
      case 'pattern':
        return errors.message;
    }
  };

  return (
    <InputWrapper>
      <Inputbox>
        <InputContent
          placeholder={placeholder}
          type={placeholder === '이메일' ? 'text' : passwordState ? 'text' : 'password'}
          {...register(name, { required: required, pattern: pattern })}
        />
        {placeholder === '비밀번호' && <img src={passwordState ? eyeOn : eyeOff} onClick={onEyeClickHandler} />}
      </Inputbox>
      {errors && <ErrorMessage>{renderErrorMessage()}</ErrorMessage>}
    </InputWrapper>
  );
};

export default Input;
