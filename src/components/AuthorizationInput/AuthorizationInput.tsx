/* eslint-disable react/require-default-props */
import { UseFormRegisterReturn } from 'react-hook-form';

interface IAuthorizationInput {
  placeholder: string;
  type?: string;
  register: UseFormRegisterReturn<string>;
  onKeyUp: () => void;
  message: string;
}

function AuthorizationInput({
  type = 'text',
  placeholder,
  register,
  onKeyUp,
  message,
}: IAuthorizationInput) {
  return (
    <div className="authorization-input">
      <input
        type={type}
        className={`authorization-input__input ${
          message ? 'authorization-input__input-error' : ''
        }`}
        placeholder={placeholder}
        autoComplete="off"
        {...register}
        onKeyUp={onKeyUp}
      />
      {message && <small className="authorization-input__error">{message as string}</small>}
    </div>
  );
}

export default AuthorizationInput;
