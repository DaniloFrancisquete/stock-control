import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/user/interfaces/products/response/GetAllProductsResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataTransferService {

  public productsDataEmitter$ =
  new BehaviorSubject<GetAllProductsResponse | null>(null);
  public productsData: Array<GetAllProductsResponse> =[]


  constructor() { }
}
