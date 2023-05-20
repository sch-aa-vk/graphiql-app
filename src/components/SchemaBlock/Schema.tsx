import { GraphQLSchema } from 'graphql';
import SchemaItem from './SchemaItem';
import { addNestedObj, removeLastNestedObj } from '../../store/workspaceSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { TNestedObjs } from '../../models';

function Schema(props: { schema: GraphQLSchema }) {
  const { schema } = props;
  const { nestedObjsArr } = useAppSelector((state) => state.workspace);
  const queryType = schema.getQueryType();
  // const mutationType = schema.getMutationType();
  // const subscriptionType = schema.getSubscriptionType();
  // const typeMap = schema.getTypeMap();

  // console.log('queryType=', queryType);
  // console.log('mutationType=', mutationType);
  // console.log('subscriptionType=', subscriptionType);
  // console.log('typeMap=', typeMap);

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
    <div>
      {nestedObjsArr.length ? (
        <button type="button" onClick={handleBack}>
          {nestedObjsArr[nestedObjsArr.length - 1].name}
        </button>
      ) : (
        <p>Docs</p>
      )}
      {queryType && !nestedObjsArr.length && (
        <div>
          <span>query:</span>
          <button type="button" onClick={handleClickQuery}>
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
