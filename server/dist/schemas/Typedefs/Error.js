"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorType = void 0;
const graphql_1 = require("graphql");
exports.ErrorType = new graphql_1.GraphQLObjectType({
    name: "ErrorType",
    fields: {
        message: {
            type: graphql_1.GraphQLString
        }
    }
});
