import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
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
  editorErrorOccur,
} from '../../store/workspaceEditorSlice';
import WorkspaceButton from './WorkspaceButton';
import WorkspaceCodemirror from './WorkspaceCodeMirror';
import WorkspaceEditorTab from './WorkspaceEditorTab';
import { useSendRequestMutation } from '../../store/countriesApiSlice';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

interface WorkspaceEditorProps {
  maxHeight?: string;
}

function WorkspaceEditor(props: WorkspaceEditorProps) {
  const { maxHeight } = props;
  const gaps = 5 * 5;
  const dispatch = useDispatch();
  const currentEditorTabIdVal = useSelector(currentEditorTabId);
  const editorCodemirrorTextVal = useSelector(editorCodemirrorText) || '';
  const variablesTextVal = useSelector(variablesText) || '';
  const sendRequestCountriesApi = useSendRequestMutation()[0];
  const toolsCodemirrorVisibleVal = useSelector(toolsCodemirrorVisible);
  const editorTabsRef = useRef() as MutableRefObject<HTMLDivElement>;
  const editorToolsRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [editorTabsHeight, setEditorTabsHeight] = useState(0);
  const [editorToolsHeight, setEditorToolsHeight] = useState(0);

  useEffect(() => {
    setEditorTabsHeight(editorTabsRef.current.offsetHeight);
    setEditorToolsHeight(editorToolsRef.current.offsetHeight);
  }, []);

  return (
    <div className="workspace__editor">
      <ErrorBoundary>
        <div className="workspace__editor-tabs-wrapper" ref={editorTabsRef}>
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
                  if ((editorCodemirrorTextVal.match(/query /g) || []).length > 1) {
                    dispatch(editorErrorOccur('Only one query is allowed per tab'));
                    return;
                  }
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
                      editorErrorOccur(`Variables are invalid JSON: ${(error as Error).message}`)
                    );
                  }
                },
              }}
            />
          </div>
        </div>
      </ErrorBoundary>
      <ErrorBoundary>
        <WorkspaceCodemirror
          {...{
            className: 'workspace__codemirror',
            value: useSelector(editorCodemirrorText),
            handleChange: useCallback(
              (value: string) => {
                dispatch(editorCodemirrorChange(value));
              },
              [dispatch]
            ),
            style: {
              maxHeight: `calc((${maxHeight} - ${editorTabsHeight}px - ${editorToolsHeight}px - ${gaps}px) * ${
                toolsCodemirrorVisibleVal ? 0.5 : 1
              })`,
            },
          }}
        />
      </ErrorBoundary>
      <ErrorBoundary>
        <div className="workspace__editor-tools" ref={editorToolsRef}>
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
      </ErrorBoundary>
      <ErrorBoundary>
        <WorkspaceCodemirror
          {...{
            className: 'workspace__tool-codemirror',
            value: useSelector(toolsCodemirrorText),
            visible: toolsCodemirrorVisibleVal,
            handleChange: useCallback(
              (value: string) => {
                dispatch(toolsCodemirrorChange(value));
              },
              [dispatch]
            ),
            style: {
              maxHeight: `calc((${maxHeight} - ${editorTabsHeight}px - ${editorToolsHeight}px - ${gaps}px) * 0.5)`,
            },
          }}
        />
      </ErrorBoundary>
    </div>
  );
}

WorkspaceEditor.defaultProps = {
  maxHeight: '100%',
};

export default WorkspaceEditor;
