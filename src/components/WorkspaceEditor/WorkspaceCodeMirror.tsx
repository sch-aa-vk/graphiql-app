import CodeMirror from '@uiw/react-codemirror';

interface WorkspaceCodemirrorProps {
  className?: string;
  value?: string;
  visible?: boolean;
  handleChange?: (value: string) => void;
}

function WorkspaceCodemirror(props: WorkspaceCodemirrorProps) {
  const { className, value, visible, handleChange } = props;

  if (!visible) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }

  return <CodeMirror className={className} value={value} onChange={handleChange} />;
}

WorkspaceCodemirror.defaultProps = {
  className: '',
  value: '',
  visible: true,
  handleChange: () => {},
};

export default WorkspaceCodemirror;
