import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';
import { BrandsService } from './brands.service';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private brandsService: BrandsService,
  ) {}

  findAll() {
    return this.productRepository.find({ relations: ['brand'] });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne(id, {
      relations: ['brand'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    // const newProduct = new Product();

    // newProduct.image = data.image;
    // newProduct.name = data.name;
    // newProduct.description = data.description;
    // newProduct.price = data.price;
    // newProduct.stock = data.stock;

    const newProduct = this.productRepository.create(data);
    if (data.brandId) {
      const brand = await this.brandsService.findOne(data.brandId);
      newProduct.brand = brand;
    }
    return this.productRepository.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepository.findOne(id);
    console.log(product);

    if (changes.brandId) {
      const brand = await this.brandsService.findOne(changes.brandId);
      product.brand = brand;
    }

    this.productRepository.merge(product, changes);
    return this.productRepository.save(product);
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }
}
