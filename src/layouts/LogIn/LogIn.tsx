import { useState } from 'react';
import { Link } from 'react-router-dom';
import { logInWithEmailAndPassword } from '../../utils/firebase';
import { IAuthorization } from '../../utils/types';
import AuthorizationInput from '../../components/AuthorizationInput';

import './style.scss';

function LogIn({ active, setActive }: IAuthorization) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    if (!password || !email) throw new Error();
    logInWithEmailAndPassword(email, password);
  };

  return (
    <div className="login-layout">
      <p>Log In</p>
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
      <button type="button" onClick={login}>
        Log In
      </button>
      <div>
        <Link to="/reset-email">Forgot Password</Link>
      </div>
      <div>
        Don&apos;t have an account?
        <button type="button" onClick={() => setActive(!active)}>
          Register
        </button>
        now.
      </div>
    </div>
  );
}

export default LogIn;
