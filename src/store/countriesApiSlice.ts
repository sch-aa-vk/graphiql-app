import { FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const countriesApi = createApi({
  reducerPath: 'countriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/graphql' }),
  endpoints: (builder) => ({
    sendRequest: builder.mutation({
      query: (body: FetchArgs) => {
        try {
          return {
            url: '',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              query: body.body.query,
              variables: JSON.parse(body.body.variables || '{}'),
            }),
          };
        } catch (error) {
          throw new Error((error as Error).message);
        }
      },
    }),
  }),
});

export const { useSendRequestMutation } = countriesApi;
