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
exports.AddLoginDTL = void 0;
const User_1 = require("../models/User");
const Verify_1 = require("../utils/Verify");
const AddLoginDTL = (resolve, root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    (0, Verify_1.verify)((context().req), context().res);
    const currUser = yield User_1.User.findOne({ _id: context().req.user.id });
    context().req.body.createdBy = currUser._id;
    context().req.body.updatedBy = currUser._id;
});
exports.AddLoginDTL = AddLoginDTL;
