"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PostCommunity = {
    id: {
        type: mongoose_1.default.Schema.ObjectId,
    },
    name: {
        type: String
    }
};
const PostSchema = new mongoose_1.default.Schema({
    parentPostId: {
        default: null,
        ref: "post",
        type: mongoose_1.default.Schema.ObjectId,
    },
    topic: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    community: {
        type: mongoose_1.default.Schema.ObjectId,
        required: true,
        ref: "community"
    },
    image: {
        type: String
    },
    user: {
        type: mongoose_1.default.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    likedBy: [{
            type: mongoose_1.default.Schema.ObjectId,
            ref: "User"
        }],
    dislikedBy: [{
            type: mongoose_1.default.Schema.ObjectId,
            ref: "User"
        }],
    createdBy: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date
    },
    updatedBy: {
        type: mongoose_1.default.Schema.ObjectId
    },
    updatedAt: {
        type: Date
    }
});
exports.Post = mongoose_1.default.model("Post", PostSchema);
