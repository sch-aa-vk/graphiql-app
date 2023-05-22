import { TGrphQLField } from '../../models';
import FieldArgItem from './FieldArgItem';
import FieldReturnTypeItem from './FieldReturnTypeItem';

function SchemaField(props: { fieldObj: TGrphQLField }) {
  const { fieldObj } = props;

  const fieldArgsArr = fieldObj?.args || [];

  return (
    <div>
      <p className="schema-title">Type:</p>
      <div className="left-indent">
        <FieldReturnTypeItem fieldObj={fieldObj} keysArr={[]} />
      </div>
      {!!fieldArgsArr.length && (
        <>
          <p className="schema-title">Arguments:</p>
          {fieldArgsArr.map((fieldArg) => (
            <div key={fieldArg.name} className="left-indent">
              <FieldArgItem fieldArg={fieldArg} keysArr={[]} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default SchemaField;
