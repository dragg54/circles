import { useDispatch } from "react-redux"
import { closeResponseModal, openResponseModal } from "../redux/ResponseModal"

const useTimedModal = () =>{
    const dispatch = useDispatch()
    return function (msg: string){
        dispatch(openResponseModal({msg}))
        setTimeout(()=>{
            dispatch(closeResponseModal({msg}))
        },2000)
    }
}

export default useTimedModal