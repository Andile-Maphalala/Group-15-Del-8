import { DecimalPipe } from '@angular/common';

export class PurchaseLine { 
DATE : Date;
SUPPLIERID : number;
PURCHASELINEID:number;
ITEMID:number;
PURCHASEID:number;
NAME:string;
DESCRIPTION: string;  
QUANTITY:number;
PRICE: DecimalPipe;
}