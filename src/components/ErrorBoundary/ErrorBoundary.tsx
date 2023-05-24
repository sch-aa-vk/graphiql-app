/* eslint-disable react/require-default-props */
import { Component, ReactNode } from 'react';
import { withTranslation } from 'react-i18next';
import { t } from 'i18next';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    } as State;
  }

  public componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  public render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <p className="error-modal__text error-modal__text-important">{t('errorBoundary')}</p>;
    }

    return children;
  }
}

export default withTranslation()(ErrorBoundary);
