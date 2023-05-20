import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
} from 'graphql';
import { useAppDispatch } from '../../hooks/storeHooks';
import { addNestedObj } from '../../store/workspaceSlice';
import {
  TGrphQLNonNullObj,
  TGrphQLNonNullScalar,
  TGrphQLOfTypeNonNullObj,
  TGrphQLOfTypeObj,
} from './schema.model';
import { TGrphQLField } from '../../models';

type TnestedObj = GraphQLObjectType | GraphQLInputObjectType | GraphQLScalarType | null;

function FieldReturnTypeItem(props: { fieldObj: TGrphQLField }) {
  const { fieldObj } = props;
  const dispatch = useAppDispatch();

  const fieldObjType = fieldObj.type;
  const isGraphQLObjectType = 'name' in fieldObjType;
  const haveOfType = 'ofType' in fieldObjType;

  let nestedObj: TnestedObj = null;

  if (isGraphQLObjectType) {
    nestedObj = fieldObjType as GraphQLObjectType;
  } else if ('ofType' in (fieldObjType.ofType as TGrphQLOfTypeObj)) {
    const ofTypeObj = (fieldObjType.ofType as TGrphQLOfTypeObj).ofType;
    if ('ofType' in ofTypeObj) {
      const listObj = (fieldObjType as TGrphQLOfTypeNonNullObj).ofType as TGrphQLOfTypeObj;
      const nonNullObj = listObj.ofType as TGrphQLNonNullObj;
      nestedObj = nonNullObj.ofType as GraphQLObjectType;
    } else {
      const nonNullObj = fieldObjType.ofType as TGrphQLNonNullScalar;
      nestedObj = nonNullObj.ofType as GraphQLScalarType;
    }
  } else {
    nestedObj = (fieldObjType as GraphQLNonNull<GraphQLScalarType>).ofType as GraphQLScalarType;
  }

  const grphQLOfTypeObjName = (nestedObj as GraphQLObjectType | GraphQLScalarType).name;

  const handleClickReturnType = () => {
    if (!nestedObj) return;
    dispatch(addNestedObj(nestedObj));
  };

  return (
    <>
      {haveOfType && <span>{'ofType' in fieldObjType.ofType && '['}</span>}
      <button type="button" onClick={handleClickReturnType}>
        {grphQLOfTypeObjName}
      </button>
      {!isGraphQLObjectType && (
        <span>
          {(fieldObjType.ofType as TGrphQLOfTypeObj).ofType instanceof GraphQLNonNull && (
            <span>!</span>
          )}
        </span>
      )}
      {haveOfType && <span>{'ofType' in fieldObjType.ofType && ']'}</span>}
    </>
  );
}

export default FieldReturnTypeItem;
