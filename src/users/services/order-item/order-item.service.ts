import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './../../entities/order.entity';
import { OrderItem } from './../../entities/order-item.entity';

import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
} from './../../dtos/order-item.dto';
import { ProductsService } from 'src/products/services/products.service';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    private productService: ProductsService,
  ) {}

  findAll() {
    return this.orderItemRepo.find({ relations: ['product'] });
  }

  async findOne(id: number) {
    const orderItem = await this.orderItemRepo.findOne(id, {
      relations: ['product'],
    });
    if (!orderItem) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return orderItem;
  }

  async create(data: CreateOrderItemDto) {
    const order = await this.orderRepo.findOne(data.orderId);
    const product = await this.productService.findOne(data.productId);

    const newOrderItem = new OrderItem();

    newOrderItem.order = order;
    newOrderItem.product = product;
    newOrderItem.quantity = data.quantity;

    return this.orderItemRepo.save(newOrderItem);
  }

  async update(id: number, changes: UpdateOrderItemDto) {
    const orderItem = await this.orderItemRepo.findOne(id);
    if (changes.productId) {
      const product = await this.productService.findOne(changes.productId);
      orderItem.product = product;
    }
    this.orderItemRepo.merge(orderItem, changes);
    return this.orderItemRepo.save(orderItem);
  }

  remove(id: number) {
    return this.orderItemRepo.delete(id);
  }
}
