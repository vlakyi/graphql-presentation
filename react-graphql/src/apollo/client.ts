import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND_URL,
  cache: new InMemoryCache({
    typePolicies: {
      Car: {
        fields: {
          licenseNo: {
            merge(_, incoming) {
              // console.log("licenses", { incoming });
              return "LN: " + incoming;
            },
            read(existing) {
              // console.log("licenses", { existing });
              return existing.replace("LN: ", "");
            },
          },
        },
      },
    },
  }),
});
