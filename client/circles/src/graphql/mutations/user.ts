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

export const CREATE_NEW_USER = gql`
    mutation CreateNewUser($userName: String, $email: String, $bio: String, $password: String, $communities: [ID]){
        createUser(userName: $userName, email: $email, bio: $bio, password: $password, communities: $communities){
            userName
            email
            communities
        }
    }
`