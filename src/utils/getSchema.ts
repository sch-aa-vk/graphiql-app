import { buildClientSchema, getIntrospectionQuery } from 'graphql';

const introspectionQuery = getIntrospectionQuery();

const getShema = async () => {
  const url = 'https://countries.trevorblades.com/graphql';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query: introspectionQuery }),
  });

  const schemaJSON = await response.json();
  const buildClientSch = buildClientSchema(schemaJSON.data);
  return buildClientSch;
};

export default getShema;
