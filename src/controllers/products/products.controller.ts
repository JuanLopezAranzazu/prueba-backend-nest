import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';

import { Response } from 'express';
import { ProductsService } from './../../services/products/products.service';
import { CreateProductDto, UpdateProductDto } from './../../dtos/product.dtos';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  @HttpCode(HttpStatus.ACCEPTED)
  getProducts(@Res() response: Response) {
    const products = this.productsService.findAll();
    console.log(products);
    response.status(200).json(products);
  }

  @Get('/:productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOneProduct(
    @Res() response: Response,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    const product = this.productsService.findOne(productId);
    console.log(productId, product);
    response.status(200).json(product);
  }

  @Post()
  createProduct(@Res() response: Response, @Body() payload: CreateProductDto) {
    const savedProduct = this.productsService.create(payload);
    response.status(201).json(savedProduct);
  }

  @Put('/:productId')
  updateProduct(
    @Res() response: Response,
    @Param('productId', ParseIntPipe) productId: number,
    @Body() payload: UpdateProductDto,
  ) {
    const updatedProduct = this.productsService.update(productId, payload);
    response.status(200).json(updatedProduct);
  }

  @Delete('/:productId')
  deleteProduct(
    @Res() response: Response,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    const product = this.productsService.remove(productId);
    console.log(productId, product);
    response.status(204).json(product);
  }
}
