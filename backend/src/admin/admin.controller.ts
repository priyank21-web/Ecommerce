import { Controller, Get, Headers } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('tenants')
  tenants() {
    return this.adminService.tenants();
  }

  @Get('orders')
  orders(@Headers('x-tenant-id') tenantId: string) {
    return this.adminService.orders(tenantId);
  }

  @Get('campaigns')
  campaigns(@Headers('x-tenant-id') tenantId: string) {
    return this.adminService.campaigns(tenantId);
  }
}
