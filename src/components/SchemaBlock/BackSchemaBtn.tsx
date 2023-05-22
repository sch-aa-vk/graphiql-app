import { GraphQLSchema } from 'graphql';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { removeLastNestedObj } from '../../store/workspaceSlice';
import getSchemaItem from './getSchemaItem';
import { TNestedObjs } from '../../models';

function BackSchemaBtn(props: { schema: GraphQLSchema }) {
  const { schema } = props;
  const dispatch = useAppDispatch();

  const { nestedObjsArr } = useAppSelector((state) => state.workspace);
  const graphqlType = getSchemaItem(schema, nestedObjsArr);
  const graphqlTypeName = (graphqlType as TNestedObjs)?.name;

  const handleBack = () => {
    dispatch(removeLastNestedObj());
  };

  return (
    <button type="button" onClick={handleBack} className="schema__back-btn">
      <span className="schema__back-btn-arrow">❮</span>
      {graphqlTypeName}
    </button>
  );
}

export default BackSchemaBtn;
