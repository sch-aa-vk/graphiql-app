import { GraphQLObjectType, isInputObjectType, isListType, isScalarType } from 'graphql/type';
import FieldItem from './FieldItem';
import SchemaField from './SchemaField';
import { TGrphQLField, TNestedObjs } from '../../models';

function SchemaItem(props: { graphqlType: TNestedObjs | null }): JSX.Element {
  const { graphqlType } = props;

  if (!graphqlType) return <div />;

  if (graphqlType.name === 'Query' && graphqlType instanceof GraphQLObjectType) {
    if (!graphqlType.getFields) return <div />;
    const fields = graphqlType.getFields();
    const fieldsArray = Object.entries(fields);

    return (
      <div>
        <p>Fields</p>
        {(fieldsArray ?? []).map(([fieldName, fieldObj]) => (
          <FieldItem key={fieldName} fieldName={fieldName} fieldObj={fieldObj} />
        ))}
      </div>
    );
  }

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
      <div>
        <p>Fields</p>
        {(fieldsArray ?? []).map(([fieldName, fieldObj]) => (
          <FieldItem key={fieldName} fieldName={fieldName} fieldObj={fieldObj} />
        ))}
      </div>
    );
  }

  if (isInputObjectType((graphqlType as TGrphQLField).type)) {
    return <SchemaField fieldObj={graphqlType} />;
  }

  if (isListType((graphqlType as TGrphQLField).type)) {
    return <SchemaField fieldObj={graphqlType} />;
  }

  if (isScalarType((graphqlType as TGrphQLField).type)) {
    return <SchemaField fieldObj={graphqlType} />;
  }

  return <div />;
}

export default SchemaItem;
