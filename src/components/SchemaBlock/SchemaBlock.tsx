import { GraphQLSchema } from 'graphql';
import Schema from './Schema';

function SchemaBlock(props: { schema: GraphQLSchema | null }) {
  const { schema } = props;

  return (
    <div className="schema">
      {schema ? <Schema schema={schema} /> : <div>Schema not received</div>}
    </div>
  );
}

export default SchemaBlock;
