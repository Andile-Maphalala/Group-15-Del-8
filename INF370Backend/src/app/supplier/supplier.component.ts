import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs'; 
import {Item} from 'src/classes/Item';
import {Purchase} from 'src/classes/Purchase';
import {Supplier} from 'src/classes/Supplier';
import {PurchaseLine} from 'src/classes/PurchaseLine';
import { MaintenanceService } from 'src/app/maintenance.service';



import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  @ViewChild('addAreaclosebutton') addTypeclosebutton;
  dataSaved = false;  
  supplierForm: any;  
  deleteForm: any; 
  allsuppliers: Observable<Supplier[]>;  
  supplierIdUpdate = null;  
  massage = null;  
  showModalBox: boolean = false;
  AddshowModalBox: boolean = false;
  updateSupplierForm: any; 
  updateEmployee:any;
  product:Supplier[];
  searchedKeyword: string;
  
  
  
  constructor(private modalService: NgbModal,private _Router : Router,private formbulider: FormBuilder,private manService:MaintenanceService) { }  
  ngOnInit(): void { 


    // if (sessionStorage.getItem('EmployeeID') == null) {
    //   this.router.navigate(['']);
    // }

    this.updateSupplierForm = this.formbulider.group({  
      SUPPLIERID:['', [Validators.required]], 
      NAME:['', [Validators.required]],  
   //   EMAIL:['', [Validators.required]],  
      ADDRESS: ['', [Validators.required]],  
      PHONENUMBER:['',[Validators.required, Validators.pattern("[0-9]*"),Validators.maxLength(10),Validators.minLength(10)]],
      EMAIL:   ['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
     
    })  
    this.supplierForm = this.formbulider.group({  
      //SUPPLIERID:['', [Validators.required]],  
      NAME:['', [Validators.required]], 
      ADDRESS:['', [Validators.required]], 
      PHONENUMBER:['',[Validators.required, Validators.pattern("[0-9]*"),Validators.maxLength(10),Validators.minLength(10)]],
      EMAIL:   ['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    
        }) 
    this.loadAllsuppliers();  
  }  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
 
 }
 loadAllsuppliers() {  
  this.allsuppliers = this.manService.getAllSupliers();  
}  

    
  
   onFormSubmit() {  
     this.dataSaved = false;  
     const supps = this.supplierForm.value;  
     this.Createsupplier(supps);  
     this.supplierForm.reset();  
   }  
   onFormSubmitUpdateEmployee() {  
        this.dataSaved = false;  
        const supps = this.updateSupplierForm.value;  
         this.UpdateSuppliers(supps);  
        this.updateSupplierForm.reset();  
        
      }  
      onFormSubmitUpdatedelete() {  
        this.dataSaved = false;  
        const supps = this.updateSupplierForm.value;  
         this.deleteSupplier(supps);  
        this.updateSupplierForm.reset();  
        
      }  
  
  

      
  loadToEdit(supplierID: string) {  
    this.manService.getSupplierById(supplierID).subscribe(supply=> {  
      this.massage = null;  
      this.dataSaved = false;  
      this.supplierIdUpdate = supply.SUPPLIERID;  
      this.updateSupplierForm.controls['SUPPLIERID'].setValue(supply.SUPPLIERID); 
      this.updateSupplierForm.controls['NAME'].setValue(supply.NAME); 
      this.updateSupplierForm.controls['ADDRESS'].setValue(supply.ADDRESS); 
      this.updateSupplierForm.controls['EMAIL'].setValue(supply.EMAIL); 
      this.updateSupplierForm.controls['PHONENUMBER'].setValue(supply.PHONENUMBER); 
    
          
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

  
       @ViewChild('content') content : any;
       @ViewChild('content') content1 : any;
       
       openWindowCustomClass() {
        this.modalService.open(this.content,{ centered: true });
       }
       openWindowCustomClass1() {
         this.modalService.open(this.content,{ centered: true });
        }
  
   Createsupplier(suppliers: Supplier) {  
  if (this.supplierIdUpdate == null) {  
    this.manService.CreateSupplier(suppliers).subscribe(  
      () => {  
       
        this.dataSaved = true;  
       this.massage = 'Record saved Successfully';  
        this.loadAllsuppliers();  
        this.supplierIdUpdate = null;  
        this.closebutton.nativeElement.click(); 
       // this.openWindowCustomClass1();

        this.supplierForm.reset();  
      }  
    );  
  } 
}   
  
UpdateSuppliers(supplier:Supplier){
  debugger;
        this.manService.Updatesuppliers(supplier).subscribe(() => {  
        this.dataSaved = true;  
        this.massage = 'Record Updated Successfully';  
        this.loadAllsuppliers();  
        this.supplierIdUpdate = null;  
        this.openWindowCustomClass();   
        this.updateSupplierForm.reset(); }
     );
 
  }
  deleteSupplier(supplierID: string) {  
    if (confirm("Are you sure you want to delete this ?")) {   
    this.manService.deleteSupplierById(supplierID).subscribe(() => {  
      this.dataSaved = true;  
      this.massage = 'Record Deleted Succefully';  
      this.loadAllsuppliers();  
      this.supplierIdUpdate = null;  
      this.supplierForm.reset();  
  
    });  
  }  
  }  
  resetForm() {  
     this.supplierForm.reset();  
     this.massage = null;  
     this.dataSaved = false;  
     }  
     
}
