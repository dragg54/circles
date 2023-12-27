import { FormTypes } from "./Form"

export type globalModalState = {
    formModal: {
        formName: FormTypes,
        isOpened: boolean
    }
}