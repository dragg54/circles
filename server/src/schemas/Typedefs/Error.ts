import { GraphQLObjectType, GraphQLString } from "graphql";

export const ErrorType = new GraphQLObjectType({
    name: "ErrorType",
    fields:{
       
        message:{
            type: GraphQLString
        }
    }
})