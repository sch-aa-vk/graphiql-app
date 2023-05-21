import { isInputObjectType, isListType, isScalarType } from 'graphql/type';
import FieldItem from './FieldItem';
import SchemaField from './SchemaField';
import { TGrphQLField, TNestedObjs } from '../../models';

function SchemaItem(props: { graphqlType: TNestedObjs | null }): JSX.Element {
  const { graphqlType } = props;

  if (!graphqlType) return <div />;

  if (isScalarType(graphqlType)) {
    return <div>{graphqlType.description}</div>;
  }

  if ('args' in graphqlType) {
    return <SchemaField fieldObj={graphqlType} />;
  }

  if ('getFields' in graphqlType) {
    const fields = graphqlType.getFields();
    const fieldsArray = Object.entries(fields);

    return (
      <div className="schema__fields fields">
        <p className="fields__title schema-title">Fields</p>
        <div className="fields__block">
          {(fieldsArray ?? []).map(([fieldName, fieldObj]) => (
            <FieldItem key={fieldName} fieldName={fieldName} fieldObj={fieldObj} />
          ))}
        </div>
      </div>
    );
  }

  const graphqlTypeType = (graphqlType as TGrphQLField).type;
  const isList = isListType(graphqlTypeType);
  const isScalar = isScalarType(graphqlTypeType);
  const isInputObj = isInputObjectType(graphqlTypeType);

  if (isList || isScalar || isInputObj) {
    return <SchemaField fieldObj={graphqlType} />;
  }

  return <div />;
}

export default SchemaItem;
