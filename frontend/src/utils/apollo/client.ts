import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://api.studio.thegraph.com/proxy/69401/loanmanager-aave/v0.0.1",
  cache: new InMemoryCache(),
});
