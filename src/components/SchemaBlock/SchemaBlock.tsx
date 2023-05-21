import { GraphQLSchema } from 'graphql';
import Schema from './Schema';

function SchemaBlock(props: { schema: GraphQLSchema | null }) {
  const { schema } = props;

  return (
    <div className="schema">
      {schema ? (
        <Schema schema={schema} />
      ) : (
        <div className="schema__container">Schema not received</div>
      )}
    </div>
  );
}

export default SchemaBlock;
