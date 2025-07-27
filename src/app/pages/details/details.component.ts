import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/api/product.service';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { IdetailsProduct } from '../../shared/interfaces/idetails-product';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe, RouterLink, LoadingComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit, OnDestroy {
  specialProduct: IdetailsProduct = {} as IdetailsProduct;
  isLoading: boolean = true;
  errorMessage!: string | null;
  private activatedRoute = inject(ActivatedRoute)
  private readonly productService = inject(ProductService);
  private closeApi!: Subscription;
  ngOnInit(): void {
    this.getSpecailProduct();
  }
  ngOnDestroy(): void {
    this.closeApi.unsubscribe();
  }
  // get a speail product by id from url
  private getSpecailProduct(): void {
    this.closeApi = this.productService.getSpecialProduct(Number(this.activatedRoute.snapshot.params['id'])).subscribe({
      next: res => {
        setTimeout(() => {
          this.isLoading = false;
        }, 1000)
        this.specialProduct = res;
        this.errorMessage = null;
      },
      error: err => {
        this.errorMessage = 'Failed to load products. Please try again later.';
      }
    })
  }
}
