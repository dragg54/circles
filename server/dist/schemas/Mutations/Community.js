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
exports.RemoveCommunityMember = exports.LeaveCommunity = exports.JoinCommunities = exports.AddCommunityMembers = exports.DeleteCommunity = exports.UpdateCommunity = exports.CreateCommunity = void 0;
const graphql_1 = require("graphql");
const Community_1 = require("../../models/Community");
const Community_2 = require("../Typedefs/Community");
const Response_1 = require("../Typedefs/Response");
exports.CreateCommunity = {
    type: Community_2.CommunityType,
    args: {
        parentCommunityId: { type: graphql_1.GraphQLID },
        communityName: { type: graphql_1.GraphQLString },
        communityDescription: { type: graphql_1.GraphQLString }
    },
    resolve(parent, args, context) {
        try {
            const community = new Community_1.Community({
                parentCommunityUniqueReferenceNumber: args.parentCommunityId,
                communityName: args.communityName,
                communityDescription: args.communityDescription,
                createdAt: Date.now(),
                createdBy: null
            });
            return community.save();
        }
        catch (err) {
            console.log(err);
            return new Error("Internal Server Error");
        }
    }
};
exports.UpdateCommunity = {
    type: Community_2.CommunityType,
    args: {
        id: { type: graphql_1.GraphQLID },
        communityName: { type: graphql_1.GraphQLString },
        communityDescription: { type: graphql_1.GraphQLString }
    },
    resolve(parent, args, context) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Community_1.Community.updateOne({
                    _id: args.id
                });
                return "Community updated";
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
};
exports.DeleteCommunity = {
    type: graphql_1.GraphQLString,
    args: {
        id: { type: graphql_1.GraphQLID },
    },
    resolve(parent, args, context) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const community = yield Community_1.Community.findOne({ _id: args.id });
                yield Community_1.Community.deleteOne({
                    _id: args.id
                });
                return "Community deleted";
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
};
exports.AddCommunityMembers = {
    type: Community_2.CommunityType,
    args: {
        userId: { type: graphql_1.GraphQLID },
        communityId: { type: graphql_1.GraphQLID }
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const community = yield Community_1.Community.findOne({ _id: args.communityId });
                if (community.communityMembers.some((member) => member == args.userId)) {
                    throw new Error("User is already a member");
                }
                const communityMembers = community.communityMembers;
                const newCommunityMembers = [...communityMembers, args.userId];
                return Community_1.Community.findOneAndUpdate({ _id: args.communityId }, { communityMembers: newCommunityMembers });
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
};
exports.JoinCommunities = {
    type: Response_1.SuccessResponse,
    args: {
        communityId: { type: new graphql_1.GraphQLList(graphql_1.GraphQLID) },
    },
    resolve(parent, args, context) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(args);
            try {
                Promise.all(args.communityId.map((community) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    const comm = yield Community_1.Community.findOne({
                        _id: args.communityId[0]
                    });
                    if (!comm) {
                        throw new Error(`Community with id ${args.communityId[0]} does not exist`);
                    }
                    if ((_a = comm.communityMembers) === null || _a === void 0 ? void 0 : _a.includes(context().req.user.id)) {
                        throw new Error(`User is already a member of community with id ${community}`);
                    }
                    yield Community_1.Community.findByIdAndUpdate({ _id: community }, {
                        $push: {
                            communityMembers: context().req.user.id
                        }
                    }, { new: true });
                })));
                return { msg: "User added to communities" };
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
};
exports.LeaveCommunity = {
    type: Response_1.SuccessResponse,
    args: {
        communityId: { type: graphql_1.GraphQLID }
    },
    resolve(parent, args, context) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingCommunity = yield Community_1.Community.findOne({
                    _id: args.communityId
                });
                if (!existingCommunity) {
                    return new Error("community does not exist");
                }
                console.log("user", context().req.user);
                if (!existingCommunity.communityMembers.includes(context().req.user.id)) {
                    return new Error(`user is not a member of ${existingCommunity.communityName} community`);
                }
                yield Community_1.Community.findByIdAndUpdate(args.communityId, {
                    $pull: {
                        communityMembers: context().req.user.id
                    }
                }, { new: true });
                return { msg: "User removed to communities" };
            }
            catch (err) {
                console.log(err);
                return (err);
            }
        });
    }
};
exports.RemoveCommunityMember = {
    type: graphql_1.GraphQLString,
    args: {
        userId: { type: graphql_1.GraphQLID },
        communityId: { type: graphql_1.GraphQLID }
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const community = yield Community_1.Community.findOne({ _id: args.communityId });
                if (community) {
                    const userIdx = community === null || community === void 0 ? void 0 : community.communityMembers.findIndex((usr) => usr == args.userId);
                    community.communityMembers.splice(userIdx, 1);
                    yield Community_1.Community.findOneAndUpdate({ _id: args.communityId }, { communityMembers: community.communityMembers });
                    return "User removed";
                }
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
};
