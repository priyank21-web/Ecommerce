import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CustomizationModule } from './customization/customization.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { AdsAnalyticsModule } from './ads-analytics/ads-analytics.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ProductsModule,
    CustomizationModule,
    OrdersModule,
    PaymentsModule,
    AdsAnalyticsModule,
    AdminModule,
  ],
})
export class AppModule {}
