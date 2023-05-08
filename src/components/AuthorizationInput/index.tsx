/* eslint-disable object-curly-newline */
/* eslint-disable react/require-default-props */
import './style.scss';

interface IAuthorizationInput {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}

function AuthorizationInput({ type = 'text', value, onChange, placeholder }: IAuthorizationInput) {
  return <input type={type} value={value} onChange={onChange} placeholder={placeholder} />;
}

export default AuthorizationInput;
