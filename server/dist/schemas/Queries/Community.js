"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCommunitiesById = exports.GetCommunitiesByUserId = exports.GetCommunities = void 0;
const graphql_1 = require("graphql");
const Community_1 = require("../Typedefs/Community");
const Community_2 = require("../../models/Community");
exports.GetCommunities = {
    type: new graphql_1.GraphQLList(Community_1.CommunityType),
    resolve() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const communities = yield Community_2.Community.find();
                return communities;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
};
exports.GetCommunitiesByUserId = {
    type: new graphql_1.GraphQLList(Community_1.CommunityType),
    args: { userId: { type: graphql_1.GraphQLID } },
    resolve(parent, args, context) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const communities = yield Community_2.Community.find({
                    communityMembers: {
                        $in: [context().req.user.id]
                    }
                });
                return communities;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
};
exports.GetCommunitiesById = {
    type: Community_1.CommunityType,
    args: { id: { type: graphql_1.GraphQLID } },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const community = yield Community_2.Community.findOne({ _id: args.id });
                return community;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
};
