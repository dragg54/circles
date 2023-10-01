import { Context } from "../types/Context";
import { verify } from "../utils/Verify";

export const IsAuthenticated = async (resolve:any,root: any,  args: any, context: any) =>{
    verify(context().req, context().res)
    let {  createdBy, updatedBy } = args
    args.createdBy = context().req.user.id 
    args.updatedBy = context().req.user.id 
    console.log("arguments", args)
    return resolve(root, args, context)
}

export const IsAuthorizedAuthor = async (resolve:any,root: any,  args: any, context: any) =>{
    verify(context().req, context().res)
    if(args.createdBy == context().req?.user.id){
        throw new Error("User not authorized to make request")
    }
    return resolve(root, args, context)
}