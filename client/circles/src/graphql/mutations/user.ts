import { gql } from "@apollo/client";

export const LoginUser = gql`
    mutation LoginUser($email:String, $password:String){
        loginUser(email:$email, password: $password){
            token
            status
        }
    }
`
export const FOLLOW = gql`
    mutation Follow($userId: ID){
        follow(userId: $userId){
            msg
        }
    }
`
export const UNFOLLOW = gql`
    mutation UnFollow($userId: ID){
        unfollow(userId: $userId){
            msg
        }
    }
`