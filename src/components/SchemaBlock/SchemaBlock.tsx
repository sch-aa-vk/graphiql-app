import { GraphQLSchema } from 'graphql';
import Schema from './Schema';

function SchemaBlock(props: { schema: GraphQLSchema | null; maxHeight: number }) {
  const { schema, maxHeight } = props;

  return (
    <div className="schema" style={{ maxHeight }}>
      {schema ? (
        <Schema schema={schema} />
      ) : (
        <div className="schema__container">Schema not received</div>
      )}
    </div>
  );
}

export default SchemaBlock;
