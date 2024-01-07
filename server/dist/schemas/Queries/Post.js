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
exports.GetPostComment = exports.GetPostsById = exports.GetPostsByUserId = exports.GetCommunityPosts = exports.GetPosts = void 0;
const graphql_1 = require("graphql");
const Post_1 = require("../Typedefs/Post");
const Post_2 = require("../../models/Post");
exports.GetPosts = {
    type: new graphql_1.GraphQLList(Post_1.PostResponse),
    resolve(parent, args, context) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let posts;
                var allPosts = yield Post_2.Post.find()
                    .populate("user", "userName profilePic")
                    .populate("community", "_id communityName")
                    // .limit(20)
                    .lean();
                const _posts = [];
                allPosts.forEach((post) => {
                    if (!post.parentPostId) {
                        const _post = Object.assign(Object.assign({}, post), { comments: allPosts.filter((pst) => pst.parentPostId == post._id.toString()) });
                        _posts.push(_post);
                    }
                });
                return _posts;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
};
exports.GetCommunityPosts = {
    type: new graphql_1.GraphQLList(Post_1.PostType),
    args: {
        community: { type: new graphql_1.GraphQLList(graphql_1.GraphQLID) }
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allPosts = yield Post_2.Post.find({
                    community: {
                        $in: args.community
                    }
                })
                    .populate("user", "userName profilePic")
                    .populate("community", "communityName")
                    .lean();
                const _posts = [];
                allPosts.forEach((post) => {
                    if (!post.parentPostId) {
                        const _post = Object.assign(Object.assign({}, post), { comments: allPosts.filter((pst) => pst.parentPostId == post._id.toString()) });
                        _posts.push(_post);
                    }
                });
                return _posts;
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
};
exports.GetPostsByUserId = {
    type: new graphql_1.GraphQLList(Post_1.PostType),
    args: {
        userId: { type: graphql_1.GraphQLID }
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield Post_2.Post.find({ createdBy: args.userId })
                    .populate("user", "userName profilePic")
                    .populate("community", "communityName");
                return posts;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
};
exports.GetPostsById = {
    type: Post_1.PostResponse,
    args: { id: { type: graphql_1.GraphQLID } },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield Post_2.Post.findOne({ _id: args.id })
                    .populate("user", "userName profilePic")
                    .populate("community", "_id communityName")
                    .lean();
                const posts = yield Post_2.Post.find()
                    .populate("user", "userName profilePic")
                    .populate("community", "_id communityName")
                    .lean();
                console.log(posts);
                const _post = Object.assign(Object.assign({}, post), { comments: posts.filter((pst) => pst.parentPostId == post._id.toString()) });
                return _post;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
};
exports.GetPostComment = {
    type: new graphql_1.GraphQLList(Post_1.PostType),
    args: { parentPostId: { type: graphql_1.GraphQLID } },
    resolve(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { parentPostId } = args;
                const posts = yield Post_2.Post.find({
                    parentPostId
                })
                    .populate("user", "userName profilePic");
                return posts;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
};
