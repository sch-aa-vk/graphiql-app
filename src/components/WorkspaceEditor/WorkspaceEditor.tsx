import { useCallback, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import xmark from '../../assets/icons/xmark.svg';

function Editor() {
  const [toolCMVisible, setToolCMVisible] = useState(false);
  const onChangeCM = useCallback((value: string) => value, []);
  const onChangeToolCM = useCallback((value: string) => value, []);
  const [newTabId, setNewTabId] = useState(1);
  const [tabsIds, setTabsIds] = useState([newTabId]);

  const handleAddClick = () => {
    setNewTabId(newTabId + 1);
    setTabsIds([newTabId + 1, ...tabsIds]);
  };

  const handleRunClick = () => {};

  const handleCloseTabClick = () => {};

  return (
    <div className="workspace__editor">
      <div className="workspace__editor-tabs-wrapper">
        <div className="workspace__editor-tabs">
          {/* TODO: вынести таб в отдельный компонент, ему требуется стейт */}
          {tabsIds.map((el) => (
            <div className="workspace__editor-tab-wrapper" key={`w${el}`}>
              <button className="workspace__editor-tab btn_rectangle" type="button" key={el}>
                {`# ${el}`}
              </button>
              <button
                className="workspace__editor-tab_close"
                type="button"
                key={`c${el}`}
                style={{ backgroundImage: `url(${xmark})` }}
                onClick={handleCloseTabClick}
              >
                {' '}
              </button>
            </div>
          ))}
        </div>
        <div className="workspace__editor-btns">
          <button
            className="workspace__editor-tabs-add btn_square"
            type="button"
            onClick={handleAddClick}
          >
            add
          </button>
          <button
            className="workspace__editor-tabs-run btn_square"
            type="button"
            onClick={handleRunClick}
          >
            run
          </button>
        </div>
      </div>
      <CodeMirror
        className="workspace__codemirror"
        value="# console.log('hello world!');"
        onChange={onChangeCM}
        style={{
          maxHeight: `calc((100vh - 60px - 45px - 135px) * ${toolCMVisible ? 0.5 : 1})`,
        }}
      />
      <div className="workspace__editor-tools">
        <button className="btn_rectangle" type="button">
          Variables
        </button>
        <button className="btn_rectangle" type="button">
          Headers
        </button>
        <button
          className="workspace__editor-tools-toggler btn_square"
          type="button"
          onClick={() => setToolCMVisible(!toolCMVisible)}
        >
          tggl
        </button>
      </div>
      {toolCMVisible && (
        <CodeMirror
          className="workspace__tool-codemirror"
          value=""
          onChange={onChangeToolCM}
          style={{
            maxHeight: 'calc((100vh - 60px - 45px - 135px) * 0.5)',
          }}
        />
      )}
    </div>
  );
}

export default Editor;
