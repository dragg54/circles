import express, { Request, Response } from 'express'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'
import { connectDb } from './config/db'
import { schema } from './schemas'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { verify } from './utils/Verify'
import { UserLoginRequest, UserLoginResponse } from './types/User'
import bodyParser from 'body-parser'
import path from 'path'
import { applyMiddleware } from 'graphql-middleware'
import { middleWare } from './middlewares'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'


const app = express()

app.use(morgan('tiny'));
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, POST, PUT, DELETE');
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
        'Access-Control-Allow-Headers', 'true'
    )
    res.header('Access-Control-Allow-Credentials', 'true');
  
    next();
  });
dotenv.config()
connectDb()
app.use(cookieParser())

const { graphqlUploadExpress} = require('graphql-upload')
app.use('/', (express.static(path.join(__dirname, 'upload'))))
const schemaWithMiddleware = applyMiddleware(schema, middleWare)
app.use("/graphql",
cors<cors.CorsRequest>({ origin:'http://localhost:5173', credentials:true}),
graphqlUploadExpress({ maxFileSize: 2500000, maxFiles: 10 }),
graphqlHTTP((req, res)=>{
return{
    schema: schemaWithMiddleware,
    graphiql: true,
        context: () => {
        return {req, res}
    },
}}))

const port = process.env.PORT
app.listen(port, () => {
    console.log(`listening to port ${port}`)
})


