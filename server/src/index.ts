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


const app = express()

app.use(morgan('tiny'));
app.use(cors({
    origin: "http://localhost:3000"
}))
dotenv.config()
connectDb()


const { graphqlUploadExpress} = require('graphql-upload')
app.use('/', (express.static(path.join(__dirname, 'upload'))))
const schemaWithMiddleware = applyMiddleware(schema, middleWare)
app.use("/graphql",
graphqlUploadExpress({ maxFileSize: 2000000, maxFiles: 10 }),
graphqlHTTP((req, res)=>{
return{
    schema: schemaWithMiddleware,
    graphiql: true,
        context: () => {
        return {req, res}
    }
}}))

const port = process.env.PORT
app.listen(port, () => {
    console.log(`listening to port ${port}`)
})


