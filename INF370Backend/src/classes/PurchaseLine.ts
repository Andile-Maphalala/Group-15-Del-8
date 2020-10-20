import { DecimalPipe } from '@angular/common';

export class PurchaseLine { 
PURCHASELINEID:number;
ITEMID:number;
PURCHASEID:number;
NAME:string;
DESCRIPTION: string;  
QUANTITY:number;
PRICE: DecimalPipe;
}