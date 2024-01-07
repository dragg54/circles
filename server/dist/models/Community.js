"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Community = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CommunitySchema = new mongoose_1.default.Schema({
    communityName: {
        type: String,
        required: true
    },
    communityMembers: [
        {
            type: mongoose_1.default.Schema.ObjectId,
            ref: "User",
        }
    ],
    communityDescription: {
        type: String
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
exports.Community = mongoose_1.default.model("community", CommunitySchema);
