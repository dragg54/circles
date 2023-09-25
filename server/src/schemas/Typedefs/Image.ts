import { GraphQLObjectType, GraphQLString, GraphQLInputObjectType, GraphQLScalarType } from "graphql";


export const ImageType = new GraphQLObjectType({
    name: 'Image',
    fields:{
      filename: { type: GraphQLString },
      mimetype: { type: GraphQLString },
      encoding: { type: GraphQLString },
      // url: { type: GraphQLString }, // URL to access the uploaded image
    },
  });

export const Upload = new GraphQLScalarType({
    name: "Upload",
})