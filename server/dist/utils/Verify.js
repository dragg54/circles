"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require;
function verify(req, next) {
    const token = req.headers.auth;
    if (!token) {
        throw new Error("User not logged in");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        const user = {
            id: decoded.id,
            userName: decoded.userName,
            profilePicture: decoded.profilePicture,
            following: decoded.following,
            followers: decoded.followers,
            email: decoded.email,
            bio: decoded.bio
        };
        req.user = user;
    }
    catch (err) {
        throw new Error(err);
    }
}
exports.verify = verify;
