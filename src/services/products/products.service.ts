import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './../../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../../dtos/product.dtos';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Keyboard electronic',
      description: 'This is a keyboard',
      price: 455.34,
      stock: 12,
      createdAt: new Date().toISOString(),
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    const ids = this.products.map((product) => product.id);
    const maxId = Math.max(...ids);
    const newProduct = {
      id: maxId + 1,
      ...payload,
      createdAt: new Date().toISOString(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);
    const index = this.products.findIndex((product) => product.id === id);
    this.products[index] = {
      ...product,
      ...payload,
    };
    return this.products[index];
  }

  remove(id: number) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(index, 1);
    return true;
  }
}
