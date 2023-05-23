/* eslint-disable react/require-default-props */
import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorModal from '../ErrorModal/ErrorModal';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      message: '',
    } as State;
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true, message: '' };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ message: `Uncaught error: ${error} ${errorInfo}` });
  }

  private setMessage() {
    this.setState({ message: '' });
  }

  public render() {
    const { hasError, message } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <ErrorModal message={message} setMessage={this.setMessage} />;
    }

    return children;
  }
}

export default ErrorBoundary;
