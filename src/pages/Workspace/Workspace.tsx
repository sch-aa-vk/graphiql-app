import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { GraphQLSchema } from 'graphql';
import { useDispatch, useSelector } from 'react-redux';
import { docsClick, docsPanelVisible, docsFetched, fetchDocs } from '../../store/workspaceSlice';
import { SchemaLoading, WorkspaceEditor } from '../../components';
import WorkspaceButton from '../../components/WorkspaceEditor/WorkspaceButton';
import getShema from '../../utils/getSchema';

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

  useEffect(() => {
    getShema()
      .then((grphQLSchema) => {
        setSchema(grphQLSchema);
      })
      .catch((err) => {
        console.log('err=', err);
      })
      .finally(() => dispatch(fetchDocs(true)));
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
            }}
          />
        </aside>
        <Splitter className="workspace__splitter-1" layout={layout}>
          <SplitterPanel
            className="workspace-docs-wrapper"
            size={100 / 3}
            style={isDocsPanelVisible ? { display: 'block' } : { display: 'none' }}
          >
            {isDocsPanelVisible && (
              <Suspense fallback={<SchemaLoading />}>
                <LazySchema schema={schema} />
              </Suspense>
            )}
          </SplitterPanel>
          <SplitterPanel size={200 / 3}>
            <Splitter className="workspace__splitter-2" layout={layout}>
              <SplitterPanel size={layout === Layout.horizontal ? 50 : 200 / 3}>
                <WorkspaceEditor />
              </SplitterPanel>
              <SplitterPanel size={layout === Layout.horizontal ? 50 : 100 / 3}>
                results
              </SplitterPanel>
            </Splitter>
          </SplitterPanel>
        </Splitter>
      </section>
    </div>
  );
}

export default Workspace;
