import { TGrphQLField } from '../../models';
import FieldArgItem from './FieldArgItem';
import FieldReturnTypeItem from './FieldReturnTypeItem';

function SchemaField(props: { fieldObj: TGrphQLField }) {
  const { fieldObj } = props;

  const fieldArgsArr = fieldObj?.args || [];

  return (
    <div>
      <p>Type:</p>
      <FieldReturnTypeItem fieldObj={fieldObj} />
      {!!fieldArgsArr.length && (
        <>
          <p>Arguments:</p>
          {fieldArgsArr.map((fieldArg) => (
            <div key={fieldArg.name}>
              <FieldArgItem fieldArg={fieldArg} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default SchemaField;
