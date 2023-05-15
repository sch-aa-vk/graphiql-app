interface WorkspaceButtonProps {
  text?: string;
  className?: string;
  active?: boolean;
  handleClick?: () => void;
  disabled?: boolean;
}

function WorkspaceButton(props: WorkspaceButtonProps) {
  const { text, className, active, handleClick, disabled } = props;

  return (
    <button
      className={`${className} ${active ? 'active' : ''}`}
      type="button"
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

WorkspaceButton.defaultProps = {
  text: '',
  className: '',
  active: false,
  handleClick: () => {},
  disabled: false,
};

export default WorkspaceButton;
