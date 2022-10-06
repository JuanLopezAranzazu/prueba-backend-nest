import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto, UpdateProductDto } from './dtos/product.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async createProduct(payload: CreateProductDto): Promise<Product> {
    const savedProduct = new this.productModel(payload);
    return savedProduct.save();
  }

  async findAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOneProduct(productId: string): Promise<Product> {
    const product = await this.productModel.findOne({ _id: productId }).exec();
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  async updateProduct(
    productId: string,
    payload: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productModel
      .findByIdAndUpdate(productId, payload)
      .setOptions({ overwrite: true, new: true });
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  async deleteProduct(productId: string) {
    const id = { _id: productId };
    const deleted = await this.productModel.remove(id);
    return deleted;
  }
}
