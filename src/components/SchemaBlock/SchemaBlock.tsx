import { GraphQLSchema } from 'graphql';
import { useEffect, useState } from 'react';
import Schema from './Schema';
import getShema from '../../utils/getSchema';

function SchemaBlock() {
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);

  useEffect(() => {
    getShema()
      .then((grphQLSchema) => {
        setSchema(grphQLSchema);
      })
      .catch((err) => {
        console.log('err=', err);
      });
  }, [setSchema]);

  return <div className="schema">{schema && <Schema schema={schema} />}</div>;
}

export default SchemaBlock;
