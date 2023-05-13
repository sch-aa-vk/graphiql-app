import { Splitter, SplitterPanel } from 'primereact/splitter';
import { useEffect, useRef, useState } from 'react';
import { WorkspaceEditor } from '../../components';

enum Layout {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

function Workspace() {
  const layout = useRef(window.innerWidth).current > 480 ? Layout.horizontal : Layout.vertical;
  const [docsVisible, setDocsVisible] = useState(false);
  const [docsFetched, setDocsFetched] = useState(false);

  useEffect(() => {
    setDocsFetched(true);
  }, []);

  return (
    <section className="workspace wrapper">
      <aside className="workspace__sidebar">
        <button
          className="workspace__docs-btn btn_square"
          type="button"
          onClick={() => setDocsVisible(!docsVisible)}
          disabled={!docsFetched}
        >
          docs
        </button>
      </aside>
      <Splitter className="workspace__splitter-1" layout={layout}>
        <SplitterPanel
          className="workspace-docs-wrapper"
          size={100 / 3}
          style={docsVisible ? { display: 'block' } : { display: 'none' }}
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
  );
}

export default Workspace;
