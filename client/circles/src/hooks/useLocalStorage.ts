import { useState } from "react"

type Item = {
    [x: string]: string | undefined
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useLocalStorage = (args:{key: string, data:any}):Item | void =>{
    const [item , setItem] = useState({[args.key]: ""})
    if(args.data == null){
        setItem({[`${args.key}`]:JSON.parse(localStorage.getItem(args.key)!)})
        return item;
    }
    else{
        localStorage.setItem(args.key, JSON.stringify(args.data))
        return 
    }
}