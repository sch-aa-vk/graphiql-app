import { Splitter, SplitterPanel } from 'primereact/splitter';
import { MutableRefObject, Suspense, lazy, useEffect, useRef, useState } from 'react';
import { GraphQLSchema } from 'graphql';
import { useDispatch, useSelector } from 'react-redux';
import { docsClick, docsPanelVisible, docsFetched, fetchDocs } from '../../store/workspaceSlice';
import { ErrorModal, SchemaLoading, WorkspaceEditor } from '../../components';
import WorkspaceButton from '../../components/WorkspaceEditor/WorkspaceButton';
import getShema from '../../utils/getSchema';
import WorkspaceCodemirror from '../../components/WorkspaceEditor/WorkspaceCodeMirror';
import { responseCodemirrorText } from '../../store/workspaceEditorSlice';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

enum Layout {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

const LazySchema = lazy(() => import('../../components/SchemaBlock/SchemaBlock'));

function Workspace() {
  const layout = useRef(window.innerWidth).current > 480 ? Layout.horizontal : Layout.vertical;
  const isVerticalLayout = layout === Layout.vertical;
  const dispatch = useDispatch();
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const isDocsPanelVisible = useSelector(docsPanelVisible);
  const workspaceEditorRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [workspaceEditorHeight, setWorkspaceEditorHeight] = useState(0);
  const schemaDisplayValue = isDocsPanelVisible ? 'block' : 'none';

  useEffect(() => {
    getShema()
      .then((grphQLSchema) => {
        setSchema(grphQLSchema);
      })
      .catch((err) => {
        setErrorMessage((err as Error).message);
      })
      .finally(() => dispatch(fetchDocs(true)));
    setWorkspaceEditorHeight(workspaceEditorRef.current.clientHeight);
  }, [setSchema, dispatch]);

  return (
    <div className="main__wrapper">
      <section className="workspace wrapper">
        <aside className="workspace__sidebar">
          <WorkspaceButton
            {...{
              className: 'workspace__docs-btn btn_square',
              active: useSelector(docsPanelVisible),
              handleClick: () => {
                dispatch(docsClick());
              },
              disabled: !useSelector(docsFetched),
              id: 'open_docs',
            }}
          />
        </aside>
        <Splitter className="workspace__splitter-1" layout={layout}>
          <SplitterPanel
            className="workspace-docs-wrapper"
            size={100 / 3}
            style={{ display: schemaDisplayValue, overflow: 'auto' }}
          >
            {isDocsPanelVisible && (
              <Suspense fallback={<SchemaLoading />}>
                <LazySchema schema={schema} maxHeight={workspaceEditorHeight - 20} />
              </Suspense>
            )}
          </SplitterPanel>
          <SplitterPanel size={200 / 3}>
            <Splitter className="workspace__splitter-2" layout={layout}>
              <SplitterPanel size={isVerticalLayout ? (isDocsPanelVisible ? 100 : 200) / 3 : 50}>
                <WorkspaceEditor
                  {...{
                    maxHeight: `${
                      isVerticalLayout && !isDocsPanelVisible
                        ? workspaceEditorHeight * 2
                        : workspaceEditorHeight
                    }px`,
                  }}
                />
              </SplitterPanel>
              <SplitterPanel size={isVerticalLayout ? 100 / 3 : 50}>
                <ErrorBoundary>
                  <div ref={workspaceEditorRef} style={{ height: '100%' }}>
                    <WorkspaceCodemirror
                      {...{
                        className: 'workspace__response-codemirror',
                        value: useSelector(responseCodemirrorText),
                        style: {
                          maxHeight: `${workspaceEditorHeight}px`,
                        },
                        readOnly: true,
                      }}
                    />
                  </div>
                </ErrorBoundary>
              </SplitterPanel>
            </Splitter>
          </SplitterPanel>
        </Splitter>
      </section>
      {errorMessage && <ErrorModal message={errorMessage} setMessage={setErrorMessage} />}
    </div>
  );
}

export default Workspace;
