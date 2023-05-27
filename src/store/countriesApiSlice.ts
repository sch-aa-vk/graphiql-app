import { FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const countriesApi = createApi({
  reducerPath: 'countriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://countries.trevorblades.com/graphql' }),
  endpoints: (builder) => ({
    sendRequest: builder.mutation({
      query: (body: FetchArgs) => ({
        url: '',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: body.body.query,
          variables: JSON.parse(body.body.variables),
        }),
      }),
    }),
  }),
});

export const { useSendRequestMutation } = countriesApi;
