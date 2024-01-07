"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const schemas_1 = require("./schemas");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const graphql_middleware_1 = require("graphql-middleware");
const middlewares_1 = require("./middlewares");
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, morgan_1.default)('tiny'));
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Headers', 'true');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
dotenv_1.default.config();
(0, db_1.connectDb)();
app.use((0, cookie_parser_1.default)());
const { graphqlUploadExpress } = require('graphql-upload');
app.use('/', (express_1.default.static(path_1.default.join(__dirname, 'upload'))));
const schemaWithMiddleware = (0, graphql_middleware_1.applyMiddleware)(schemas_1.schema, middlewares_1.middleWare);
app.use("/graphql", (0, cors_1.default)({ origin: 'http://localhost:5173', credentials: true }), graphqlUploadExpress({ maxFileSize: 2500000, maxFiles: 10 }), (0, express_graphql_1.graphqlHTTP)((req, res) => {
    return {
        schema: schemaWithMiddleware,
        graphiql: true,
        context: () => {
            return { req, res };
        },
    };
}));
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`listening to port ${port}`);
});
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message, err);
    server.close(() => {
        process.exit(1);
    });
});
