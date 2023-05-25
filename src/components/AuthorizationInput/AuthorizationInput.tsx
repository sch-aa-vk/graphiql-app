/* eslint-disable react/require-default-props */
import { useRef } from 'react';
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
  const isPassword = type === 'password';
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePasswordVisibility = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    inputRef.current!.type = e.currentTarget.checked ? 'text' : 'password';
  };

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
        ref={inputRef}
      />
      {isPassword && (
        <label htmlFor="checkbox" className="authorization-page__label">
          <input
            id="checkbox"
            type="checkbox"
            className="authorization-page__checkbox"
            onClick={handlePasswordVisibility}
          />
          <p className="authorization-page__label-text">Make password visible</p>
        </label>
      )}
      {message && <small className="authorization-input__error">{message as string}</small>}
    </div>
  );
}

export default AuthorizationInput;
