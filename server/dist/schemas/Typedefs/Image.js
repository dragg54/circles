"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Upload = exports.ImageType = void 0;
const graphql_1 = require("graphql");
exports.ImageType = new graphql_1.GraphQLObjectType({
    name: 'Image',
    fields: {
        filename: { type: graphql_1.GraphQLString },
        mimetype: { type: graphql_1.GraphQLString },
        encoding: { type: graphql_1.GraphQLString },
        // url: { type: GraphQLString }, // URL to access the uploaded image
    },
});
exports.Upload = new graphql_1.GraphQLScalarType({
    name: "Upload",
});
