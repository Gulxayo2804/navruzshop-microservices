
export class AppError extends Error{
    statusCode:number;

    constructor(message:string, statusCode=500, details?:string){
        super(message);
        this.statusCode = statusCode;
        if(details){
            this.stack = details
        }
    }
}