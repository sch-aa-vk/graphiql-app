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
        placeholder={placeholder}
        autoComplete="off"
        required
        {...register}
        onKeyUp={onKeyUp}
      />
      {message && <small>{message as string}</small>}
    </div>
  );
}

export default AuthorizationInput;
