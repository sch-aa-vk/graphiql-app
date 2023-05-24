import CodeMirror from '@uiw/react-codemirror';
import { CSSProperties } from 'react';
import { langs } from '@uiw/codemirror-extensions-langs';

interface WorkspaceCodemirrorProps {
  className?: string;
  value?: string;
  visible?: boolean;
  handleChange?: (value: string) => void;
  style?: CSSProperties;
  readOnly?: boolean;
}

function WorkspaceCodemirror(props: WorkspaceCodemirrorProps) {
  const { className, value, visible, handleChange, style, readOnly } = props;

  if (!visible) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }

  return (
    <CodeMirror
      className={className}
      value={value}
      onChange={handleChange}
      style={style}
      readOnly={readOnly}
      extensions={[langs.json()]}
    />
  );
}

WorkspaceCodemirror.defaultProps = {
  className: '',
  value: '',
  visible: true,
  handleChange: () => {},
  style: {},
  readOnly: false,
};

export default WorkspaceCodemirror;
