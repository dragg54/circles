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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unfollow = exports.Follow = exports.LoginUser = exports.CreateUser = void 0;
const graphql_1 = require("graphql");
const User_1 = require("../Typedefs/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_2 = require("../../models/User");
const Error_1 = require("../../types/Error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const file_1 = require("../../middlewares/file");
const Community_1 = require("../../models/Community");
const Response_1 = require("../Typedefs/Response");
const { GraphQLUpload, FileUpload } = require('graphql-upload');
exports.CreateUser = {
    type: User_1.UserType,
    args: {
        userName: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        bio: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
        communities: { type: new graphql_1.GraphQLList(graphql_1.GraphQLID) },
        file: { type: GraphQLUpload }
    },
    resolve(parent, args, context) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield User_2.User.findOne({ email: args.email }).or([{ userName: args.userName }]);
                if (existingUser) {
                    return new Error_1.DuplicateError("User already exists");
                }
                let imageUrl;
                if (args.file) {
                    imageUrl = yield (0, file_1.readFile)(args.file);
                }
                bcryptjs_1.default
                    .genSalt(10)
                    .then(salt => {
                    return bcryptjs_1.default.hash(args.password, salt);
                })
                    .then((hash) => __awaiter(this, void 0, void 0, function* () {
                    const { userName, email, password, bio, communities } = args;
                    const user = new User_2.User({
                        userName,
                        email,
                        profilePic: imageUrl,
                        password: hash,
                        bio,
                        createdAt: Date.now(),
                        createdBy: context.userId
                    });
                    const newuser = yield user.save();
                    yield Promise.all(communities.map((comm) => __awaiter(this, void 0, void 0, function* () {
                        const community = yield Community_1.Community.findOne({
                            _id: newuser._id
                        });
                        if (community) {
                            return new Error("User already belongs to community");
                        }
                        const updatedCommunity = yield Community_1.Community.findByIdAndUpdate({
                            _id: comm
                        }, { $push: { communityMembers: newuser._id } }, { new: true });
                    })));
                    return newuser;
                }))
                    .catch((err) => __awaiter(this, void 0, void 0, function* () {
                    console.log(err);
                    return err;
                }));
            }
            catch (err) {
                throw new Error_1.InternalServerError(err);
            }
        });
    }
};
exports.LoginUser = {
    type: User_1.UserLoginResponse,
    args: {
        email: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString }
    },
    resolve(parent, args, context) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield User_2.User.findOne({
                    email: args.email
                });
                if (!existingUser) {
                    throw new Error_1.NotFoundError("User not found");
                }
                const isMatch = bcryptjs_1.default.compare(args.password, existingUser.password);
                if (!isMatch) {
                    throw new Error("Password is incorrect");
                }
                const userCommunities = yield Community_1.Community.find({
                    communityMembers: {
                        $in: [existingUser._id]
                    }
                });
                const token = jsonwebtoken_1.default.sign({ id: existingUser._id, email: existingUser.email, userName: existingUser.userName, bio: existingUser.bio, profilePicture: existingUser.profilePic, communities: userCommunities }, process.env.SECRET_KEY);
                context().res.cookie('auth', token, { maxAge: 3600000, httpOnly: true, sameSite: "lax" });
                return { status: "OK", token };
            }
            catch (err) {
                throw err;
            }
        });
    }
};
exports.Follow = {
    type: Response_1.SuccessResponse,
    args: {
        userId: { type: graphql_1.GraphQLID }
    },
    resolve(parent, args, context) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield User_2.User.findByIdAndUpdate(args.userId, {
                    $push: {
                        followers: context().req.user.id
                    }
                }, { new: true });
                return {
                    msg: "request successful"
                };
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
};
exports.Unfollow = {
    type: Response_1.SuccessResponse,
    args: {
        userId: { type: graphql_1.GraphQLID }
    },
    resolve(parent, args, context) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield User_2.User.findByIdAndUpdate(args.userId, {
                    $pull: {
                        followers: context().req.user.id
                    }
                }, { new: true });
                return {
                    msg: "request successful"
                };
            }
            catch (err) {
                console.log(err);
            }
        });
    }
};
