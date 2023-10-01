import { User } from "../models/User"
import { Context } from "../types/Context"
import { UserLoginRequest } from "../types/User"
import { verify } from "../utils/Verify"

export const AddLoginDTL =  async (resolve:any,root: any,  args: any, context: Context) =>{
    verify((context().req) as UserLoginRequest, context().res)
    const currUser = await User.findOne({_id: (context().req as UserLoginRequest).user.id})
    context().req.body.createdBy = currUser!._id
    context().req.body.updatedBy = currUser!._id
}