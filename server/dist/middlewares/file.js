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
exports.readFile = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const readFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const { createReadStream, filename } = yield file;
    const stream = createReadStream();
    var { ext, name } = (0, path_1.parse)(filename);
    name = `single${Math.floor((Math.random() * 10000) + 1)}`;
    let url = (0, path_1.join)(__dirname, `../upload/${name}-$${Date.now()}${ext}`);
    console.log(url);
    const imageStream = yield (0, fs_1.createWriteStream)(url);
    yield stream.pipe(imageStream);
    url = `localhost:3001/${url.split('upload')[1]}`;
    return url;
});
exports.readFile = readFile;
