"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = void 0;
const graphql_1 = require("graphql");
exports.SuccessResponse = new graphql_1.GraphQLObjectType({
    name: "RequestResponse",
    fields: {
        msg: { type: graphql_1.GraphQLString }
    }
});
