import WorkspaceButton from './WorkspaceButton';

interface WorkspaceEditorTabProps {
  editorTabId: number;
  currentEditorTabId: number;
  handleSelect: (editorTabId: number) => void;
  handleClose: (editorTabId: number) => void;
}

function WorkspaceEditorTab(props: WorkspaceEditorTabProps) {
  const { editorTabId, currentEditorTabId, handleSelect, handleClose } = props;
  const active = editorTabId === currentEditorTabId;

  const customHandleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target instanceof HTMLButtonElement) {
      if ((event.target as HTMLButtonElement).innerHTML) {
        handleSelect(editorTabId);
      } else {
        handleClose(editorTabId);
      }
    }
  };

  return (
    <div
      className={`workspace__editor-tab ${active ? 'active' : ''}`}
      onClick={customHandleClick}
      aria-hidden="true"
    >
      <WorkspaceButton
        {...{
          text: `# ${editorTabId}`,
          className: 'workspace__editor-tab-select btn_rectangle',
          id: `window_number_${editorTabId}`,
        }}
      />
      <WorkspaceButton
        {...{ className: 'workspace__editor-tab_close', id: `close_window_${editorTabId}` }}
      />
    </div>
  );
}

export default WorkspaceEditorTab;
