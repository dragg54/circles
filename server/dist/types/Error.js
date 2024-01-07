"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.DuplicateError = exports.NotFoundError = void 0;
class NotFoundError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.NotFoundError = NotFoundError;
class DuplicateError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.DuplicateError = DuplicateError;
class InternalServerError extends Error {
    constructor(errMsg, message = "Internal Server Error") {
        super();
        message = this.message.concat(",", errMsg);
    }
}
exports.InternalServerError = InternalServerError;
