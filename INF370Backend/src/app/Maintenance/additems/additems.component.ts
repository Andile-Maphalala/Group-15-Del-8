import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs'; 
import {Item} from 'src/classes/Item';
import {Purchase} from 'src/classes/Purchase';
import {Supplier} from 'src/classes/Supplier';
import {PurchaseLine} from 'src/classes/PurchaseLine';
import { MaintenanceService } from 'src/app/maintenance.service';

@Component({
  selector: 'app-additems',
  templateUrl: './additems.component.html',
  styleUrls: ['./additems.component.css']
})
export class AdditemsComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  @ViewChild('addAreaclosebutton') addTypeclosebutton;
  dataSaved = false;  
  itemForm: any;  
  purchaseForm: any; 
  supplierForm: any; 
  purchaselineForm: any; 
  allitems: Observable<Item[]>;  
  allpurchases: Observable<Purchase[]>;  
  allsuppliers: Observable<Supplier[]>;  
  allpurchaseline: Observable<PurchaseLine[]>;  
  itemIdUpdate = null;  
  purchaseIdUpdate = null; 
  supplierIdUpdate = null;
  purchaselineIdUpdate = null; 
  massage = null;  
  showModalBox: boolean = false;
  AddshowModalBox: boolean = false;
  updateEmployeeForm: any; 
  updateEmployee:any;
 

  
  
  
  constructor(private formbulider: FormBuilder,private manService:MaintenanceService) { }  
  ngOnInit(): void {  
    this.itemForm = this.formbulider.group({  
      //ITEMID:['', [Validators.required]], 
      NAME:['', [Validators.required]],  
      DESCRIPTION:['', [Validators.required]],  
     
    })  
    this.loadAllitems();  
    this.purchaseForm = this.formbulider.group({  
     // PURCHASEID:['', [Validators.required]],  
      SUPPLIERID:['', [Validators.required]],  
      QUANTITY: ['', [Validators.required]],  
      PRICE:['', [Validators.required]],  
      DATE:['', [Validators.required]],  
        }) 
    this.loadAllpurchases();  
    this.purchaselineForm = this.formbulider.group({  
     // PURCHASELINEID:['', [Validators.required]],  
      ITEMID:['', [Validators.required]], 
      PURCHASEID:['', [Validators.required]], 
      // QUANTITY: ['', [Validators.required]],  
      // PRICE:['', [Validators.required]],  
      // NAME:['', [Validators.required]],  
      // DESCRIPTION:['', [Validators.required]],  
        }) 
    this.loadAllpurchaselines();  

    this.supplierForm = this.formbulider.group({  
      //SUPPLIERID:['', [Validators.required]],  
      NAME:['', [Validators.required]], 
      ADDRESS:['', [Validators.required]], 
      PHONENUMBER:['', [Validators.required]],  
      EMAIL:['', [Validators.required]], 
        }) 
    this.loadAllsuppliers();  
  }  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
 
 }
 loadAllitems() {  
    this.allitems = this.manService.getAllItems();  
}  
  loadAllpurchases() {  
    this.allpurchases = this.manService.getAllPurchase();  
}  
loadAllpurchaselines() {  
    this.allpurchaseline = this.manService.getAllPurchaseLine();  
}  
loadAllsuppliers() {  
  this.allsuppliers = this.manService.getAllSupliers();  
}  
    
  
   onItemFormSubmit() {  
     this.dataSaved = false;  
     const items = this.itemForm.value;  
     this.Createitems(items);  
     this.itemForm.reset();  
   }  
   onPurFormSubmit() {  
    this.dataSaved = false;  
    const purchase = this.purchaseForm.value;  
    this.Createpurchase(purchase);  
    this.purchaseForm.reset();  
  }  
  onPurlineFormSubmit() {  
    this.dataSaved = false;  
    const purchaseline = this.purchaselineForm.value;  
    this.Createpurchaseline(purchaseline);  
    this.purchaselineForm.reset();  
  }  
  onSuppplierFormSubmit() {  
    this.dataSaved = false;  
    const supplier = this.supplierForm.value;  
    this.Createsupplier(supplier);  
    this.supplierForm.reset();  
  }  
   
  

      
  loadpurchaseToEdit(supplierId: string) {  
    this.manService.getSupplierById(supplierId).subscribe(suppliers=> {  
      this.massage = null;  
      this.dataSaved = false;  
      this.supplierIdUpdate = suppliers;
      this.purchaseForm.controls['SUPPLIERID'].setValue(suppliers.SUPPLIERID); 
      
          
    }); 
  }
   loadpurchaselineToEdit(purchaseID: string) {  
    this.manService.getPurchaseById(purchaseID).subscribe(purchases=> {  
      this.massage = null;  
      this.dataSaved = false;  
      this.purchaseIdUpdate = purchases;
      this.purchaselineForm.controls['PURCHASEID'].setValue(purchases.PURCHASEID); 
      
          
    }); 
  }
      public Addopen() {
    if(0){
      // Dont open the modal
      this.AddshowModalBox = false;
    } else {
       // Open the modal
       this.AddshowModalBox = true;
    }

  }

 
  public open() {
    if(0){
      // Dont open the modal
      this.showModalBox = false;
    } else {
       // Open the modal
       this.showModalBox = true;
    }
  }
// UpdateEmployee(employees: Employee){
//       debugger;
//           this.manService.updateEmployee(employees).subscribe(() => {  
//             this.dataSaved = true;  
//             this.massage = 'Record Updated Successfully';  
//             this.loadAllemployees();  
//             this.employeeIdUpdate = null;  
//             this.updateEmployeeForm.reset(); }
//           );
      
//         }
  
  
  
Createitems(items: Item) {  
     if (this.itemIdUpdate == null) {  
       this.manService.CreateItem(items).subscribe(  
         () => {  
          this.closebutton.nativeElement.click(); 
           this.dataSaved = true;  
          this.massage = 'Record saved Successfully';  
           this.loadAllitems();  
           this.itemIdUpdate = null;  
           this.itemForm.reset();  
         }  
       );  
     } 
  }   
  Createpurchase(purchases: Purchase) {  
    if (this.purchaseIdUpdate == null) {  
      this.manService.CreatePurchase(purchases).subscribe(  
        () => {  
          this.closebutton.nativeElement.click(); 
          this.dataSaved = true;  
         this.massage = 'Record saved Successfully';  
          this.loadAllpurchases();  
          this.purchaseIdUpdate = null;  
          this.purchaseForm.reset();  
        }  
      );  
    } 
 }   
 Createpurchaseline(purchaselines: PurchaseLine) {  
  if (this.purchaselineIdUpdate == null) {  
    this.manService.CreatePurchaseline(purchaselines).subscribe(  
      () => {  
        this.closebutton.nativeElement.click(); 
        this.dataSaved = true;  
       this.massage = 'Record saved Successfully';  
        this.loadAllpurchaselines();  
        this.purchaseIdUpdate = null;  
        this.purchaseForm.reset();  
      }  
    );  
  } 
}   

Createsupplier(suppliers: Supplier) {  
  if (this.supplierIdUpdate == null) {  
    this.manService.CreateSupplier(suppliers).subscribe(  
      () => {  
        this.closebutton.nativeElement.click(); 
        this.dataSaved = true;  
       this.massage = 'Record saved Successfully';  
        this.loadAllsuppliers();  
        this.supplierIdUpdate = null;  
        this.supplierForm.reset();  
      }  
    );  
  } 
}   

  
  // deleteemployee(employeeId: string) {  
  //   if (confirm("Are you sure you want to delete this ?")) {   
  //   this.manService.deleteEmployeeById(employeeId).subscribe(() => {  
  //     this.dataSaved = true;  
  //     this.massage = 'Record Deleted Succefully';  
  //     this.loadAllemployees();  
  //     this.employeeIdUpdate = null;  
  //     this.employeeForm.reset();  
  
  //   });  
 // }  
 // }  
  // resetForm() {  
  //    this.employeeForm.reset();  
  //    this.massage = null;  
  //    this.dataSaved = false;  
  //    }  
     
}
