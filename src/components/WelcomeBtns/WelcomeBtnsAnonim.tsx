import { useNavigate } from 'react-router-dom';

function WelcomeBtnsAnonim() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/auth');
  };

  return (
    <div className="auth-block">
      <button type="button" className="auth-block__btn" onClick={handleClick}>
        Sign in / Sign Up
      </button>
    </div>
  );
}

export default WelcomeBtnsAnonim;
