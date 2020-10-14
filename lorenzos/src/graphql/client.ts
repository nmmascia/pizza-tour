import { createClient, dedupExchange, cacheExchange, fetchExchange } from 'urql';
import { authExchange } from '@urql/exchange-auth';

interface AuthState {
  token: string;
}

const client = createClient({
  url: 'http://localhost:3000/graphql',
  exchanges: [
    dedupExchange,
    cacheExchange,
    authExchange({
      getAuth: async ({ authState }: { authState: AuthState | null }): Promise<AuthState | null> => {
        if (!authState) {
          const token = localStorage.getItem('token');
          if (token) {
            return { token };
          }
          return null;
        }
        return null;
      },
      addAuthToOperation: ({ authState, operation }) => {
        if (!authState || !authState.token) {
          return operation;
        }
        const fetchOptions =
          typeof operation.context.fetchOptions === 'function'
            ? operation.context.fetchOptions()
            : operation.context.fetchOptions || {};

        return {
          ...operation,
          context: {
            ...operation.context,
            fetchOptions: {
              ...fetchOptions,
              headers: {
                ...fetchOptions.headers,
                Authorization: `Bearer ${authState.token}`,
              },
            },
          },
        };
      },
    }),
    fetchExchange,
  ],
});

export default client;
