import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordReset } from '../../utils/firebase';
import AuthorizationInput from '../../components/AuthorizationInput';

import './style.scss';

function ResetPassword() {
  const [email, setEmail] = useState('');

  const reset = () => {
    if (!email) throw new Error();
    sendPasswordReset(email);
  };

  return (
    <div className="reset-password">
      <AuthorizationInput
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
      />
      <button type="button" onClick={reset}>
        Send password reset email
      </button>
      <div>
        Don&apos;t have an account?
        <Link to="/">Register</Link>
      </div>
    </div>
  );
}

export default ResetPassword;
