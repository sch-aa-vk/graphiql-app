import CodeMirror from '@uiw/react-codemirror';
import { CSSProperties } from 'react';

interface WorkspaceCodemirrorProps {
  className?: string;
  value?: string;
  visible?: boolean;
  handleChange?: (value: string) => void;
  style?: CSSProperties;
}

function WorkspaceCodemirror(props: WorkspaceCodemirrorProps) {
  const { className, value, visible, handleChange, style } = props;

  if (!visible) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }

  return <CodeMirror className={className} value={value} onChange={handleChange} style={style} />;
}

WorkspaceCodemirror.defaultProps = {
  className: '',
  value: '',
  visible: true,
  handleChange: () => {},
  style: {},
};

export default WorkspaceCodemirror;
