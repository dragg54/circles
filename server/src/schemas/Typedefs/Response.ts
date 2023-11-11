import { GraphQLObjectType, GraphQLString } from "graphql";

export const SuccessResponse = new GraphQLObjectType({
    name: "RequestResponse",
    fields:{
        msg: {type: GraphQLString}
    }
})