import { GraphQLID } from "graphql";
import { UserType } from "../Typedefs/User";
import { User } from "../../models/User";
import { Community } from "../../models/Community";

export const GetUserById = {
    type: UserType,
    args:{
        userId: {type: GraphQLID}
    },
    async resolve(parent: any, args: {userId: string}){
        try{
            const user = await User.findOne({_id: args.userId})
            return user
        }
        catch(err){
            console.log(err)
            return err
        }
    }
}