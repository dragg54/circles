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
exports.UnlikePost = exports.LikePost = exports.DeletePost = exports.UpdatePost = exports.CreatePost = void 0;
const graphql_1 = require("graphql");
const Post_1 = require("../Typedefs/Post");
const Post_2 = require("../../models/Post");
const Error_1 = require("../../types/Error");
const file_1 = require("../../middlewares/file");
const Error_2 = require("../Typedefs/Error");
const Response_1 = require("../Typedefs/Response");
const { GraphQLUpload, FileUpload } = require('graphql-upload');
exports.CreatePost = {
    type: Post_1.PostType || Error_2.ErrorType,
    args: {
        parentPostId: { type: graphql_1.GraphQLID },
        topic: { type: graphql_1.GraphQLString },
        body: { type: graphql_1.GraphQLString },
        image: { type: GraphQLUpload },
        community: { type: graphql_1.GraphQLID },
        user: { type: graphql_1.GraphQLID },
        createdBy: { type: graphql_1.GraphQLID },
        updatedBy: { type: graphql_1.GraphQLID },
    },
    resolve(parent, args, context) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let imageUrl = '';
                if (args.image) {
                    imageUrl = yield (0, file_1.readFile)(args.image);
                }
                const post = new Post_2.Post({
                    parentPostId: args.parentPostId,
                    topic: args.topic,
                    body: args.body,
                    image: imageUrl,
                    community: args.community,
                    user: context().req.user.id,
                    createdAt: Date.now(),
                    updatedAt: null,
                    createdBy: args.createdBy,
                    updatedBy: args.updatedBy
                });
                post.save();
                return post;
            }
            catch (err) {
                return ({ msg: err.message });
            }
        });
    }
};
exports.UpdatePost = {
    type: Post_1.PostType,
    args: {
        id: { type: graphql_1.GraphQLID },
        topic: { type: graphql_1.GraphQLString },
        body: { type: graphql_1.GraphQLString }
    },
    resolve(parent, args, context) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Post_2.Post.updateOne({
                    _id: args.id
                });
                return "Post updated";
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
};
exports.DeletePost = {
    type: Post_1.PostType,
    args: {
        id: { type: graphql_1.GraphQLID },
    },
    resolve(parent, args, context) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Post_2.Post.deleteOne({
                    _id: args.id
                });
                return "Post deleted";
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
};
exports.LikePost = {
    type: Response_1.SuccessResponse,
    args: {
        postId: { type: graphql_1.GraphQLID }
    },
    resolve(parent, args, context) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingPost = yield Post_2.Post.findByIdAndUpdate(args.postId, {
                    $push: {
                        likedBy: context().req.user.id
                    }
                }, { new: true });
            }
            catch (err) {
                console.log(err);
                throw new Error_1.InternalServerError(err);
            }
        });
    }
};
exports.UnlikePost = {
    type: Response_1.SuccessResponse,
    args: {
        postId: { type: graphql_1.GraphQLID }
    },
    resolve(parent, args, context) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingPost = yield Post_2.Post.findByIdAndUpdate(args.postId, {
                    $pull: {
                        likedBy: context().req.user.id
                    }
                }, { new: true });
            }
            catch (err) {
                console.log(err);
                throw new Error_1.InternalServerError(err);
            }
        });
    }
};
