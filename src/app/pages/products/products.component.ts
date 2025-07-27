import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../../core/services/api/product.service';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { Iproduct } from '../../shared/interfaces/iproduct';
import { SlicePipe } from '../../shared/pipes/slice.pipe';

@Component({
  selector: 'app-products',
  imports: [SlicePipe, FormsModule, LoadingComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Iproduct = [];
  search: string = '';
  isLoading: boolean = true;
  errorMessage!: string | null;
  private copyProduct: Iproduct = [];
  private readonly productService = inject(ProductService);
  private closeApi!: Subscription;
  private router = inject(Router)

  ngOnInit(): void {
    this.getProducts();
  }
  ngOnDestroy(): void {
    this.closeApi.unsubscribe();
  }
  // Function to sort products based on selected type
  sortProducts(type: string) {
    this.products = this.products.sort((a: any, b: any) => {
      return type === "asc" ? a.price - b.price : type === "desc" ? b.price - a.price : type === "a-z" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    });
  }
  // Function to get selected value from a dropdown or input
  getNameOption(value: any): string {
    return value.target.value;
  }
  // Function to search products by title
  onSearch(): void {
    this.products = this.copyProduct.filter(p => {
      return this.search.trim() === '' || p.title.toLowerCase().includes(this.search.toLowerCase());
    })
  }
  // Navigate to product details page by ID
  goToDetails(id: number): void {
    this.router.navigate(['/details', id]);
  }
  // Function to get products from the API
  getProducts(): void {
    this.closeApi = this.productService.getProducts().subscribe({
      next: (res) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 1000)
        this.products = res;
        this.copyProduct = res;
        this.products = this.products.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load products. Please try again later.';
      }
    })
  }

}
