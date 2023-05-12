import { Splitter, SplitterPanel } from 'primereact/splitter';
import { useEffect, useState } from 'react';
import { WorkspaceEditor } from '../../components';

function Workspace() {
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
      <Splitter className="workspace__splitter-1">
        <SplitterPanel
          size={100 / 3}
          style={docsVisible ? { display: 'block' } : { display: 'none' }}
        >
          docs
        </SplitterPanel>
        <SplitterPanel size={200 / 3}>
          <Splitter>
            <SplitterPanel>
              <WorkspaceEditor />
            </SplitterPanel>
            <SplitterPanel>results</SplitterPanel>
          </Splitter>
        </SplitterPanel>
      </Splitter>
    </section>
  );
}

export default Workspace;
