import { gql } from "@apollo/client";

export const LoginUser = gql`
    mutation LoginUser($email:String, $password:String){
        loginUser(email:$email, password: $password){
            token
            status
        }
    }
`
