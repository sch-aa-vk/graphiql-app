import { Tooltip } from 'primereact/tooltip';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const tooltip = !active ? id : id.replace('open', 'close');
  const tooltipText = t(`${tooltip}`);

  return (
    <>
      <button
        className={`${className} ${active ? 'active' : ''} ${id}`}
        type="button"
        onClick={handleClick}
        disabled={disabled}
        data-pr-tooltip={tooltipText}
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
