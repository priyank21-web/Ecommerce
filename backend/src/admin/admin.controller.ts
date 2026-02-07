import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RequestWithUser } from '../common/auth.types';
import { Roles } from '../common/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Roles('SUPER_ADMIN')
  @Get('tenants')
  tenants() {
    return this.adminService.tenants();
  }

  @Roles('TENANT_ADMIN', 'SUPER_ADMIN')
  @Get('orders')
  orders(@Req() req: RequestWithUser) {
    return this.adminService.orders(req.user.tenantId);
  }

  @Roles('TENANT_ADMIN', 'SUPER_ADMIN')
  @Get('campaigns')
  campaigns(@Req() req: RequestWithUser) {
    return this.adminService.campaigns(req.user.tenantId);
  }
}
