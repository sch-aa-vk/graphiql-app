import { Tooltip } from 'primereact/tooltip';

interface WorkspaceButtonProps {
  text?: string;
  className?: string;
  active?: boolean;
  handleClick?: () => void;
  disabled?: boolean;
  id: string;
}

function WorkspaceButton(props: WorkspaceButtonProps) {
  const { text, className, active, handleClick, disabled, id } = props;
  const tooltip = id.split('_').join(' ');

  return (
    <>
      <button
        className={`${className} ${active ? 'active' : ''} ${id}`}
        type="button"
        onClick={handleClick}
        disabled={disabled}
        data-pr-tooltip={!active ? tooltip : tooltip.replace('open', 'close')}
      >
        {text}
      </button>
      <Tooltip target={`.${id}`} showDelay={200} className="custom-tooltip" />
    </>
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
