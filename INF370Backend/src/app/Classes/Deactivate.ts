import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export class Deactivate
{
    UserID? : number;
    Reason? : string;


    constructor(UserID?,Reason?){
        this.UserID = UserID;
        this.Reason = Reason;
    }
}