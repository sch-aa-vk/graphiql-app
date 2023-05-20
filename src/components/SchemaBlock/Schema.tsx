import { GraphQLSchema } from 'graphql';
import SchemaItem from './SchemaItem';
import { addNestedObj, removeLastNestedObj } from '../../store/workspaceSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { TNestedObjs } from '../../models';

function Schema(props: { schema: GraphQLSchema }) {
  const { schema } = props;
  const { nestedObjsArr } = useAppSelector((state) => state.workspace);
  const queryType = schema.getQueryType();

  const dispatch = useAppDispatch();

  const handleBack = () => {
    dispatch(removeLastNestedObj());
  };

  const handleClick = (nestedObj: TNestedObjs) => {
    dispatch(addNestedObj(nestedObj));
  };

  const handleClickQuery = () => {
    if (!queryType) return;
    handleClick(queryType);
  };

  return (
    <div className="schema__container">
      {nestedObjsArr.length ? (
        <button type="button" onClick={handleBack} className="schema__back-btn">
          <span className="schema__back-btn-arrow">❮</span>
          {nestedObjsArr[nestedObjsArr.length - 1].name}
        </button>
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
      {!!nestedObjsArr.length && (
        <SchemaItem graphqlType={nestedObjsArr[nestedObjsArr.length - 1]} />
      )}
    </div>
  );
}

export default Schema;
