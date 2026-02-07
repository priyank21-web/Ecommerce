import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CustomizationModule } from './customization/customization.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { AdsAnalyticsModule } from './ads-analytics/ads-analytics.module';
import { AdminModule } from './admin/admin.module';
import { RateLimitGuard } from './common/rate-limit.guard';
import { RolesGuard } from './common/roles.guard';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ProductsModule,
    CustomizationModule,
    OrdersModule,
    CartModule,
    PaymentsModule,
    AdsAnalyticsModule,
    AdminModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: RateLimitGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
