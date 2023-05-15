import ReactDOM from 'react-dom';

interface IErrorModal {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

function ErrorModal({ message, setMessage }: IErrorModal) {
  const id = setTimeout(() => {
    setMessage('');
  }, 5000);

  const closeBlock = () => {
    setMessage('');
    clearTimeout(id);
  };

  return ReactDOM.createPortal(
    <div className="error-modal">
      <button className="error-modal__button" type="button" onClick={closeBlock}>
        &#215;
      </button>
      <p className="error-modal__text">{message}</p>
    </div>,
    document.body
  );
}

export default ErrorModal;
