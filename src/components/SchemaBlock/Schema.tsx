import { GraphQLSchema } from 'graphql';
import SchemaItem from './SchemaItem';
import { addNestedObj } from '../../store/workspaceSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import BackSchemaBtn from './BackSchemaBtn';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

function Schema(props: { schema: GraphQLSchema }) {
  const { schema } = props;
  const { nestedObjsArr } = useAppSelector((state) => state.workspace);
  const queryType = schema.getQueryType();

  const dispatch = useAppDispatch();

  const handleClick = (nestedObj: string[]) => {
    dispatch(addNestedObj(nestedObj));
  };

  const handleClickQuery = () => {
    handleClick(['_queries']);
  };

  return (
    <ErrorBoundary>
      <div className="schema__container">
        {nestedObjsArr.length ? (
          <BackSchemaBtn schema={schema} />
        ) : (
          <h4 className="schema__docs-title">Docs</h4>
        )}
        {queryType && !nestedObjsArr.length && (
          <div className="schema__query left-indent">
            <span className="schema__query-title">query</span>
            <span className="fields__devider">:</span>
            <button className="schema-btn primary" type="button" onClick={handleClickQuery}>
              Query
            </button>
          </div>
        )}
        {!!nestedObjsArr.length && schema && <SchemaItem schema={schema} />}
      </div>
    </ErrorBoundary>
  );
}

export default Schema;
