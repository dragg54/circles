"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.UserSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    profilePic: {
        type: String
    },
    followers: [
        {
            type: mongoose_1.default.Schema.ObjectId,
            ref: "User"
        }
    ],
    following: [
        {
            type: mongoose_1.default.Schema.ObjectId,
            ref: "User"
        }
    ],
    bio: {
        type: String,
        require: true
    },
    createdBy: {
        type: mongoose_1.default.Schema.ObjectId
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
exports.User = mongoose_1.default.model("User", exports.UserSchema);
