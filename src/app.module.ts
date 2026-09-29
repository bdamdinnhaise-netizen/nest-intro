import { createObserveModule } from '@nestjs/observe';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
   TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'hasie',

    autoLoadEntities: true,
    synchronize: true,
   }),
  ProductsModule,
  ],
})
export class AppModule {}
