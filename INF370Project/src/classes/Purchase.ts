import { DecimalPipe } from '@angular/common';

export class Purchase { 
    PURCHASEID:number;
    SUPPLIERID:number;
    QUANTITY:number;
    PRICE: DecimalPipe;
    DATE: Date;  
}

