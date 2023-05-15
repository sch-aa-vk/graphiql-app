import { Splitter, SplitterPanel } from 'primereact/splitter';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { docsClick, docsPanelVisible, docsFetched } from '../../store/workspaceSlice';
import { WorkspaceEditor } from '../../components';
import WorkspaceButton from '../../components/WorkspaceEditor/WorkspaceButton';

enum Layout {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

function Workspace() {
  const layout = useRef(window.innerWidth).current > 480 ? Layout.horizontal : Layout.vertical;
  const dispatch = useDispatch();

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
            style={useSelector(docsPanelVisible) ? { display: 'block' } : { display: 'none' }}
          >
            docs
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
