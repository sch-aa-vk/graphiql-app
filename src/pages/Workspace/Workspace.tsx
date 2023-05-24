import { Splitter, SplitterPanel } from 'primereact/splitter';
import { MutableRefObject, Suspense, lazy, useEffect, useRef, useState } from 'react';
import { GraphQLSchema } from 'graphql';
import { useDispatch, useSelector } from 'react-redux';
import { docsClick, docsPanelVisible, docsFetched, fetchDocs } from '../../store/workspaceSlice';
import { SchemaLoading, WorkspaceEditor } from '../../components';
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
  const dispatch = useDispatch();
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
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
        throw new Error((err as Error).message);
      })
      .finally(() => dispatch(fetchDocs(true)));
    setWorkspaceEditorHeight(
      Layout.horizontal === layout ? workspaceEditorRef.current.clientHeight : 1000
    );
  }, [setSchema, dispatch, layout]);

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
            }}
          />
        </aside>
        <Splitter className="workspace__splitter-1" layout={layout}>
          <SplitterPanel
            className="workspace-docs-wrapper"
            size={100 / 3}
            style={{ display: schemaDisplayValue, overflow: 'auto hidden' }}
          >
            {isDocsPanelVisible && (
              <Suspense fallback={<SchemaLoading />}>
                <LazySchema schema={schema} maxHeight={workspaceEditorHeight} />
              </Suspense>
            )}
          </SplitterPanel>
          <SplitterPanel size={200 / 3}>
            <Splitter className="workspace__splitter-2" layout={layout}>
              <SplitterPanel size={layout === Layout.horizontal ? 50 : 200 / 3}>
                <div ref={workspaceEditorRef} style={{ height: '100%' }}>
                  <WorkspaceEditor {...{ maxHeight: `${workspaceEditorHeight}px` }} />
                </div>
              </SplitterPanel>
              <SplitterPanel size={layout === Layout.horizontal ? 50 : 100 / 3}>
                <ErrorBoundary>
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
                </ErrorBoundary>
              </SplitterPanel>
            </Splitter>
          </SplitterPanel>
        </Splitter>
      </section>
    </div>
  );
}

export default Workspace;
