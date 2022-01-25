import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindConditions, Repository } from 'typeorm';

import { Product } from './../entities/product.entity';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from './../dtos/products.dtos';
import { BrandsService } from './brands.service';
import { CategoriesService } from './categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private brandsService: BrandsService,
    private categoriesService: CategoriesService,
  ) {}

  findAll(params?: FilterProductsDto) {
    if (params) {
      const where: FindConditions<Product> = {};
      const { limit, offset } = params;
      const { minPrice, maxPrice } = params;
      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }
      return this.productRepository.find({
        relations: ['brand', 'categories'],
        where,
        take: limit,
        skip: offset,
      });
    }
    return this.productRepository.find({ relations: ['brand', 'categories'] });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne(id, {
      relations: ['brand', 'categories'],
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
    if (data.categoriesIds) {
      const categories = await this.categoriesService.findByIds(
        data.categoriesIds,
      );
      newProduct.categories = categories;
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

    if (changes.categoriesIds) {
      const categories = await this.categoriesService.findByIds(
        changes.categoriesIds,
      );
      product.categories = categories;
    }

    this.productRepository.merge(product, changes);
    return this.productRepository.save(product);
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepository.findOne(productId, {
      relations: ['categories'],
    });
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );
    return this.productRepository.save(product);
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productRepository.findOne(productId, {
      relations: ['categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${productId} not found`);
    }

    const category = await this.categoriesService.findOne(categoryId);
    if (!category) {
      throw new NotFoundException(`Category #${categoryId} not found`);
    }

    if (product.categories.find((item) => item.id == categoryId)) {
      throw new ConflictException(
        `Category #${categoryId} is already present in this product`,
      );
    } else {
      product.categories.push(category);
    }

    return this.productRepository.save(product);
  }
}
