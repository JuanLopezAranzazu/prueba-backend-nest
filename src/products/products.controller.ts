import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  Put,
  Delete,
} from '@nestjs/common';

import { Response } from 'express';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dtos/product.dtos';

@Controller('products/mongo')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/all')
  @HttpCode(HttpStatus.ACCEPTED)
  async getProducts(@Res() response: Response) {
    const products = await this.productsService.findAllProducts();
    console.log(products);
    response.status(200).json(products);
  }

  @Get('/:productId')
  @HttpCode(HttpStatus.ACCEPTED)
  async getOneProduct(
    @Res() response: Response,
    @Param('productId') productId: string,
  ) {
    const product = await this.productsService.findOneProduct(productId);
    console.log(productId, product);
    response.status(200).json(product);
  }

  @Post()
  async createProduct(
    @Res() response: Response,
    @Body() payload: CreateProductDto,
  ) {
    const savedProduct = await this.productsService.createProduct(payload);
    console.log(savedProduct);
    response.status(201).json(savedProduct);
  }

  @Put('/:productId')
  async updateProduct(
    @Res() response: Response,
    @Param('productId') productId: string,
    @Body() payload: UpdateProductDto,
  ) {
    const updatedProduct = await this.productsService.updateProduct(
      productId,
      payload,
    );
    response.status(200).json(updatedProduct);
  }

  @Delete('/:productId')
  async deleteProduct(
    @Res() response: Response,
    @Param('productId') productId: string,
  ) {
    const product = await this.productsService.deleteProduct(productId);
    console.log(productId, product);
    response.status(204).json(product);
  }
}
