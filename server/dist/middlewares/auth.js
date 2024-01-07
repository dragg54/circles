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
exports.IsAuthorizedAuthor = exports.IsAuthenticated = void 0;
const Verify_1 = require("../utils/Verify");
const IsAuthenticated = (resolve, root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    (0, Verify_1.verify)(context().req, context().res);
    args.createdBy = context().req.user.id;
    args.updatedBy = context().req.user.id;
    return resolve(root, args, context);
});
exports.IsAuthenticated = IsAuthenticated;
const IsAuthorizedAuthor = (resolve, root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    (0, Verify_1.verify)(context().req, context().res);
    if (args.createdBy == ((_a = context().req) === null || _a === void 0 ? void 0 : _a.user.id)) {
        throw new Error("User not authorized to make request");
    }
    return resolve(root, args, context);
});
exports.IsAuthorizedAuthor = IsAuthorizedAuthor;
