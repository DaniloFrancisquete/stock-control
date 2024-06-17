import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GetAllProductsResponse } from 'src/app/models/user/interfaces/products/response/GetAllProductsResponse';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: []
})
export class DashboardHomeComponent  implements OnInit{
public productsList: Array<GetAllProductsResponse> = [];



  constructor(private productsService : ProductsService,
    private messegeService: MessageService
  ) {}

  ngOnInit(): void {
      this.getProductsDatas()
  }

  getProductsDatas(): void {
    this.productsService.getAllProducts().subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.productsList = response;
          console.log('DADOS DOS PRODUTOS',this.productsList)
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
}
