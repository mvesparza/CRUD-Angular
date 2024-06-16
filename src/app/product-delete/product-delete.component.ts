// product-delete.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  product: Product | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.productService.getProduct(id).subscribe((data: Product) => {
        this.product = data;
      });
    }
  }

  deleteProduct(): void {
    if (this.product && this.product.id) {
      this.productService.deleteProduct(this.product.id).subscribe(() => {
        this.router.navigate(['/product-list']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/product-list']);
  }
}