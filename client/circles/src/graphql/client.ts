import { ApolloClient, HttpLink, InMemoryCache, } from '@apollo/client'
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from 'apollo-upload-client'

// import { onError } from "@apollo/client/link/error";


const authLink = setContext((_, { headers }) => {
    const authToken = localStorage.getItem("auth")!
    return {
      headers: {
        ...headers,
        auth: `Bearer ${JSON.parse(authToken)}`
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
  const authToken = localStorage.getItem("auth")!

  const httpLink = createUploadLink({
    uri: "http://localhost:3001/graphql",
    credentials: "include",
    headers:{
      auth: `${JSON.parse(authToken)}`

    }
  });
  

  export const client = new ApolloClient({
    cache: new InMemoryCache(),
    connectToDevTools:true,
    link: httpLink.concat(authLink),
  })
  