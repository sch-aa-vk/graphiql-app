import { useState } from 'react';
import { registerWithEmailAndPassword } from '../../utils/firebase';
import { IAuthorization } from '../../utils/types';
import AuthorizationInput from '../../components/AuthorizationInput';

import './style.scss';

function SignIn({ active, setActive }: IAuthorization) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const register = () => {
    if (!name || !password || !email) throw new Error();
    registerWithEmailAndPassword(name, email, password);
  };

  return (
    <div className="signin-layout">
      <p>Sign In</p>
      <AuthorizationInput
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
      />
      <AuthorizationInput
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
      />
      <AuthorizationInput
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="button" onClick={register}>
        Register
      </button>
      <div>
        Already have an account?
        <button type="button" onClick={() => setActive(!active)}>
          Login
        </button>
        now.
      </div>
    </div>
  );
}

export default SignIn;
