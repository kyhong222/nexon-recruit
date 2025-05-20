/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { RolesGuard } from 'src/account/guards/roles.guard';
import { Roles } from 'src/account/decorators/roles.decorator';
import { SetRoleDto } from './admin.dto';

@UseGuards(RolesGuard)
@Controller('admin')
export class AdminController {
  adminService: AdminService;

  constructor(adminService: AdminService) {
    this.adminService = adminService;
  }

  @Roles('admin')
  @Get('allUsers')
  async getAllUsers() {
    return await this.adminService.getAllUsers();
  }

  @Roles('admin')
  @Get('/:name')
  async getUserByName(@Param('name') name: string) {
    return await this.adminService.getUserByName(name);
  }

  @Roles('admin')
  @Patch('/setRole')
  async setRole(@Body() dto: SetRoleDto) {
    return await this.adminService.setRole(dto);
  }
}
