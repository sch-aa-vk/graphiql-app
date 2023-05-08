import ReactDOM from 'react-dom';

interface IErrorModal {
  message: string;
}

function ErrorModal({ message }: IErrorModal) {
  return ReactDOM.createPortal(<div className="error-modal">{message}</div>, document.body);
}

export default ErrorModal;
