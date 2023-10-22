import { GraphQLObjectType, GraphQLString } from "graphql";

export const RequestResponse = new GraphQLObjectType({
    name: "RequestResponse",
    fields:{
        msg: {type: GraphQLString}
    }
})