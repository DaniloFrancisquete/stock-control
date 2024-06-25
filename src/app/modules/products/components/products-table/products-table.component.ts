import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductEvent } from 'src/app/models/enums/products/ProductEvent';
import { DeleteProductAction } from 'src/app/models/user/interfaces/products/event/DeleteProductAction';
import { EnventAction } from 'src/app/models/user/interfaces/products/event/EventAction';
import { GetAllProductsResponse } from 'src/app/models/user/interfaces/products/response/GetAllProductsResponse';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: []
})
export class ProductsTableComponent {
@Input() products: Array<GetAllProductsResponse> = [];
@Output() productEvent = new EventEmitter<EnventAction>();
@Output() deleteProductEvent = new EventEmitter<DeleteProductAction>();

public productSelected!: GetAllProductsResponse;
public addProductEvent = ProductEvent.ADD_PRODUCT_EVENT;
public editProductEvent = ProductEvent.EDIT_PRODUCT_EVENT;

handleProductsEvent(action: string,id?: string): void {
  if(action && action !== '') {
    const productEventData = id && id !== '' ? {action, id} : {action};
    this.productEvent.emit(productEventData)
  }
}

hendleDeleteProduct(product_id: string, productName: string): void {
  if (product_id !== '' && productName !== '') {
this.deleteProductEvent.emit({
  product_id,
  productName,
})
  }
}

}
