import { QueryCache, QueryClient, QueryClientConfig } from "react-query";

export const cache = new QueryCache();

export function createQueryClient(
  queryCache = cache,
  opts?: QueryClientConfig
) {
  return new QueryClient({
    queryCache: queryCache,
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: process.env.NODE_ENV === "production",
        ...opts?.defaultOptions?.queries,
      },
    },
  });
}
