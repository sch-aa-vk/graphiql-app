import { GraphQLSchema, isInputObjectType, isListType, isScalarType, isSchema } from 'graphql/type';
import { FieldItem, SchemaField } from './SchemaItems';
import { useAppSelector } from '../../hooks/storeHooks';
import getSchemaItem from './getSchemaItem';
import { TGrphQLField } from '../../models';

function SchemaItem(props: { schema: GraphQLSchema }): JSX.Element {
  const { schema } = props;
  const { nestedObjsArr } = useAppSelector((state) => state.workspace);
  const graphqlType = getSchemaItem(schema, nestedObjsArr);

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

  if (isSchema(graphqlType)) {
    return <div />;
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
