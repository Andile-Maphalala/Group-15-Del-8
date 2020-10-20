import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export class Agent
{
    Agent_ID? : number;
    NAME? : string;
    SURNAME? : string;
    PHONE_NUMBER? : string;
    EMAIL? : string;
    COMPANY? : string;


    constructor(Agent_ID?,NAME?,SURNAME?,PHONE_NUMBER?,EMAIL?,COMPANY?){
        this.Agent_ID = Agent_ID;
        this.NAME = NAME;
        this.SURNAME = SURNAME;
        this.PHONE_NUMBER = PHONE_NUMBER;
        this.EMAIL = EMAIL;
        this.COMPANY = COMPANY;

    }
}