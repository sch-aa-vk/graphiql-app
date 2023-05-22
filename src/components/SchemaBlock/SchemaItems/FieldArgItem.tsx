import { GraphQLArgument, GraphQLNonNull } from 'graphql';
import { useAppDispatch } from '../../../hooks/storeHooks';
import { addNestedObj } from '../../../store/workspaceSlice';
import { IScalarWithName } from '../schema.model';

function FieldArgItem(props: { fieldArg: GraphQLArgument; keysArr: string[] }) {
  const { fieldArg, keysArr } = props;
  const dispatch = useAppDispatch();

  const fieldArgType = fieldArg?.type || null;
  const isFieldTypeCode = !!fieldArgType && 'ofType' in fieldArgType;

  const handleClickArg = () => {
    const nestedArr = [...keysArr, 'args'];
    if (isFieldTypeCode) {
      nestedArr.push('ofType');
    }
    dispatch(addNestedObj(nestedArr));
  };

  return (
    <>
      <span className="fields__arg-name">{fieldArg.name}</span>
      <span className="fields__devider">:</span>
      <button
        className="fields__arg-types schema-btn primary"
        type="button"
        onClick={handleClickArg}
      >
        {isFieldTypeCode ? `${(fieldArgType.ofType as IScalarWithName).name}` : fieldArgType?.name}
      </button>
      {fieldArgType instanceof GraphQLNonNull && <span>!</span>}
      {!isFieldTypeCode && (
        <>
          <span>{' = '}</span>
          <span className="fields__arg-default">{'{}'}</span>
        </>
      )}
    </>
  );
}

export default FieldArgItem;
