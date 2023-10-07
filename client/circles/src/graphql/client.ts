import { ApolloClient, HttpLink, InMemoryCache, } from '@apollo/client'
import { setContext } from "@apollo/client/link/context";
// import { onError } from "@apollo/client/link/error";


const authLink = setContext((_, { headers }) => {
    const authToken = localStorage.getItem("auth")!
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${JSON.parse(authToken)}`
      }
    }
  });

  // const errorLink = onError(({ graphQLErrors, networkError }) => {
  //   if (graphQLErrors)
  //     graphQLErrors.forEach(({ message, locations, path }) =>
  //       console.log(
  //         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
  //       ),
  //     );
  
  //   if (networkError) console.log(`[Network error]: ${networkError}`);
  // });
  
  const httpLink = new HttpLink({
    uri: "http://localhost:3001/graphql",
    credentials: "include",
  });
  
  export const client = new ApolloClient({
    cache: new InMemoryCache(),
    connectToDevTools:true,
    link: authLink.concat(httpLink),
  })
  