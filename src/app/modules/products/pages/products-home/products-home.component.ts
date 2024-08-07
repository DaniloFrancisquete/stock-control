import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductsDataTransferService } from './../../../../shared/services/products/products-data-transfer.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { EnventAction } from 'src/app/models/user/interfaces/products/event/EventAction';
import { GetAllProductsResponse } from 'src/app/models/user/interfaces/products/response/GetAllProductsResponse';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { overrides } from 'chart.js/dist/core/core.defaults';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: []
})
export class ProductsHomeComponent implements OnInit, OnDestroy {

  private readonly destroy$: Subject<void> = new Subject();
  private ref!: DynamicDialogRef;
  public productsDatas: Array< GetAllProductsResponse> = [];



constructor(
  private productsService: ProductsService,
  private  productsDtService: ProductsDataTransferService,
  private router: Router,
  private menssageService: MessageService,
  private confirmationService: ConfirmationService,
  private dialogService: DialogService,
){}


  ngOnInit(): void {
    this.getServiceProductsDatas();
  }


  getServiceProductsDatas() {
    const productsLoaded = this.productsDtService.getProductsDatas();


    if(productsLoaded.length > 0){
      this.productsDatas = productsLoaded;
    } else this.getAPIProductsDatas();

  }

  getAPIProductsDatas() {
    this.productsService.getAllProducts().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        if(response.length > 0) {
          this.productsDatas = response;
        }
      },
      error: (err) => {
        console.log(err);
        this.menssageService.add({
          severity:'error',
          summary:'Erro',
          detail:'Erro ao buscar produtos',
          life:2500,
        })
        this.router.navigate(['/dashboard'])
      }
    });
  }

  handleProductAction(event: EnventAction): void {
    if(event){
  this.ref = this.dialogService.open(ProductFormComponent, {
    header: event?.action,
    width:'70%',
    contentStyle: {overflow: 'auto'},
    baseZIndex:10000,
    maximizable:true,
    data :{
      event: event,
      productsDatas: this.productsDatas,
    },
  });
  this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
    next:() => this.getAPIProductsDatas(),
  })
    }
  }


handleDeleteProductAction(event : {
  product_id: string;
  productName: string;
}): void {
  if(event) {
    this.confirmationService.confirm({
      message:`Confirma a exclusão do produto: ${event?.productName}?`,
      header:'Confirmação de exclusão',
      icon:'pi pi-exclamation-triangle',
      acceptLabel:'Sim',
      rejectLabel:'Não',
      accept:() => this.deleteProduct(event?.product_id),
    })

  }
}
  deleteProduct(product_id: string) {
   if(product_id) {
    this.productsService
    .deleteProduct(product_id)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (responde) => {
        if (responde) {
          this.menssageService.add({
            severity:'success',
            summary: 'Sucesso',
            detail: 'Prouto removido com sucesso!',
            life:2500,
          });
          this.getAPIProductsDatas();
        }
      },error:(err) => {
        console.log(err);
        this.menssageService.add({
          severity:'error',
          summary:'Erro',
          detail:'Erro ao remover produto!'
        })
      }
    });
   }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
