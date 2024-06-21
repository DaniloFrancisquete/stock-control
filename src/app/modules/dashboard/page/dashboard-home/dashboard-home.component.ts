import { ProductsDataTransferService } from './../../../../shared/services/products/products-data-transfer.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GetAllProductsResponse } from 'src/app/models/user/interfaces/products/response/GetAllProductsResponse';
import { ProductsService } from 'src/app/services/products/products.service';
import { Subject, elementAt, takeUntil } from 'rxjs';
import { ChartData, ChartOptions } from 'chart.js';
@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: []
})
export class DashboardHomeComponent  implements OnInit, OnDestroy{

private destroy$ = new Subject<void>();
public productsList: Array<GetAllProductsResponse> = [];

public productsChartDatas!: ChartData;
public productsCharOptions!: ChartOptions;

  constructor(
    private productsService : ProductsService,
    private messegeService: MessageService,
    private productsdtService:ProductsDataTransferService
  ) {}

  ngOnInit(): void {
      this.getProductsDatas()
  }

  getProductsDatas(): void {
    this.productsService.getAllProducts()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.productsList = response;
          this.productsdtService.setProductsDatas(this.productsList);
          this.setProductsChartConfig();
        }
      }, error: (err) => {
        console.log(err)
        this.messegeService.add({
          severity: 'error',
          summary: 'Erro',
          detail:'Error ao buscar produtos!',
          life:2500,
        });
      }
    })
  }

  setProductsChartConfig(): void {
    if(this.productsList.length > 0) {
const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue('--text-color');
const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

this.productsChartDatas = {
labels: this.productsList.map((element) => element?.name),
datasets: [
  {
    label: 'Quantidade',
    backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
    borderColor: documentStyle.getPropertyValue('--indigo-400'),
    hoverBackgroundColor: documentStyle.getPropertyValue('--indigo-500'),
    data:this.productsList.map((element) => element?.amount),
  },
],
};

this.productsCharOptions = {
  maintainAspectRatio: false,
  aspectRatio:0.8,
  plugins: {
    legend: {
      labels: {
        color: textColor
      },
    },
  },

scales: {
x:{
  ticks:{
    color: textColorSecondary,
    font: {
      weight: 'bold',
    },
  },
  grid: {
    color:surfaceBorder,
  },
},
y: {
  ticks: {
    color: textColorSecondary,
  },
  grid: {
    color: surfaceBorder,
  },
},
},
};
  }

  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

}
}
