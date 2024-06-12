import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataTransferService {
  public producttsDataEmitter$ =new BehaviorSubject<Array<GetAllProductsResponse> | null>(null);
  public productsDatas: Array<GetAllProductsResponse> = [];

  setProductsDatas(products: Array<GetAllProductsResponse>): void {
    if (products) {
      this.producttsDataEmitter$.next(products);
      this.getProductsDatas();
    }
  }

  getProductsDatas() {
    this.producttsDataEmitter$
    .pipe(
      take(1),
      map((data) => data?.filter((product) => product.amount > 0))
    )
    .subscribe({
      next: (response) => {
        if (response) {
          this.productsDatas = response;
        }
      }
    });

    return this.productsDatas;
  }
}
