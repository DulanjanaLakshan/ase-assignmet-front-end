import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from "@apollo/client";

const BASE_URL = "https://322d-45-121-91-7.ngrok-free.app/graphql";


const httpLink = new HttpLink({
  uri: BASE_URL,
});

const errorMiddleware = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    if (response.errors) {
      console.error("Network error:", response.errors);
    }
    return response;
  });
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {},
  });
  return forward(operation);
});

const link = concat(errorMiddleware, concat(authMiddleware, httpLink));

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client;
