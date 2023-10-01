export class NotFoundError extends Error{
    constructor(message: string){
        super(message)
    }
}

export class DuplicateError extends Error{
    constructor(message: string){
        super(message)
    }
}

export class InternalServerError extends Error{
    constructor(errMsg: string, message = "Internal Server Error"){
        super()
        message = this.message.concat(",", errMsg)
    }
}
