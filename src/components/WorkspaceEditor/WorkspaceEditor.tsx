import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  variablesClick,
  headersClick,
  togglerClick,
  toolsCodemirrorChange,
  addClick,
  editorTabSelect,
  editorTabClose,
  variablesActive,
  headersActive,
  toolsCodemirrorVisible,
  currentEditorTabId,
  editorTabs,
  editorCodemirrorText,
  variablesText,
  toolsCodemirrorText,
  editorCodemirrorChange,
  variablesInvalidJsonOccur,
} from '../../store/workspaceEditorSlice';
import WorkspaceButton from './WorkspaceButton';
import WorkspaceCodemirror from './WorkspaceCodeMirror';
import WorkspaceEditorTab from './WorkspaceEditorTab';
import { useSendRequestMutation } from '../../store/countriesApiSlice';

function Editor() {
  const dispatch = useDispatch();
  const currentEditorTabIdVal = useSelector(currentEditorTabId);
  const editorCodemirrorTextVal = useSelector(editorCodemirrorText) || '';
  const variablesTextVal = useSelector(variablesText) || '';
  const sendRequestCountriesApi = useSendRequestMutation()[0];

  return (
    <div className="workspace__editor">
      <div className="workspace__editor-tabs-wrapper">
        <div className="workspace__editor-tabs">
          {useSelector(editorTabs).map((el) => (
            <WorkspaceEditorTab
              {...{
                editorTabId: el.editorTabId,
                currentEditorTabId: currentEditorTabIdVal,
                handleSelect: (editorTabId: number) => {
                  dispatch(editorTabSelect(editorTabId));
                },
                handleClose: (editorTabId: number) => {
                  dispatch(editorTabClose(editorTabId));
                },
              }}
              key={el.editorTabId}
            />
          ))}
        </div>
        <div className="workspace__editor-btns">
          <WorkspaceButton
            {...{
              className: 'workspace__editor-tabs-add btn_square',
              handleClick: () => {
                dispatch(addClick());
              },
            }}
          />
          <WorkspaceButton
            {...{
              className: 'workspace__editor-tabs-run btn_square',
              handleClick: () => {
                try {
                  JSON.parse(variablesTextVal || '{}');
                  sendRequestCountriesApi({
                    url: '',
                    body: {
                      query: editorCodemirrorTextVal,
                      variables: variablesTextVal || '{}',
                    },
                  });
                } catch (error) {
                  dispatch(
                    variablesInvalidJsonOccur(
                      `Variables are invalid JSON: ${(error as Error).message}`
                    )
                  );
                }
              },
            }}
          />
        </div>
      </div>
      <WorkspaceCodemirror
        {...{
          className: 'workspace__codemirror',
          value: useSelector(editorCodemirrorText),
          handleChange: useCallback(
            (value: string) => {
              dispatch(editorCodemirrorChange(value));
            },
            // eslint-disable-next-line @typescript-eslint/comma-dangle
            [dispatch]
          ),
        }}
      />
      <div className="workspace__editor-tools">
        <WorkspaceButton
          {...{
            text: 'Variables',
            className: 'workspace__editor-tools-variables btn_rectangle',
            active: useSelector(variablesActive),
            handleClick: () => {
              dispatch(variablesClick());
            },
          }}
        />
        <WorkspaceButton
          {...{
            text: 'Headers',
            className: 'workspace__editor-tools-headers btn_rectangle',
            active: useSelector(headersActive),
            handleClick: () => {
              dispatch(headersClick());
            },
          }}
        />
        <WorkspaceButton
          {...{
            className: 'workspace__editor-tools-toggler btn_square',
            active: useSelector(toolsCodemirrorVisible),
            handleClick: () => {
              dispatch(togglerClick());
            },
          }}
        />
      </div>
      <WorkspaceCodemirror
        {...{
          className: 'workspace__tool-codemirror',
          value: useSelector(toolsCodemirrorText),
          visible: useSelector(toolsCodemirrorVisible),
          handleChange: useCallback(
            (value: string) => {
              dispatch(toolsCodemirrorChange(value));
            },
            // eslint-disable-next-line @typescript-eslint/comma-dangle
            [dispatch]
          ),
        }}
      />
    </div>
  );
}

export default Editor;
