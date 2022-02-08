import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { OrderItemController } from './controllers/order-item/order-item.controller';

import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';
import { OrdersService } from './services/orders/orders.service';
import { OrderItemService } from './services/order-item/order-item.service';

import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([User, Customer, Order, OrderItem]),
  ],
  controllers: [
    CustomerController,
    UsersController,
    OrdersController,
    OrderItemController,
  ],
  providers: [CustomersService, UsersService, OrdersService, OrderItemService],
  exports: [UsersService],
})
export class UsersModule {}
