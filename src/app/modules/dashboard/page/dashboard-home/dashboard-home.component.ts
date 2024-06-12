import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { ProductsDataTransferService } from 'src/app/shared/service/products/products-data-transfer.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: []
})
export class DashboardHomeComponent implements OnInit{

  public productsList: Array<GetAllProductsResponse> = [];


  constructor(
    private productService: ProductsService,
    private messageService: MessageService,
    private productsDtService: ProductsDataTransferService,
  ){}

  ngOnInit(): void {
    this.getProductsDatas();
  }

  getProductsDatas(): void {
    this.productService.getAllProducts()
    .subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.productsList = response;
          this.productsDtService.setProductsDatas(this.productsList);
        }
      }, error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Erro ao buscar products',
          life: 2500
        })
      }
    })
  }
}
