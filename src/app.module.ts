import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/todos/products.module';
import { LoginModule } from './modules/login/login.module';

@Module({
  imports: [ProductsModule, LoginModule],
})
export class AppModule {}
