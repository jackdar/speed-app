import { Controller, Get } from "@nestjs/common";
import { AdminService } from "./admin.service";


@Controller()
export class AdminController {
    constructor(private readonly adminService: AdminService) { };

    @Get('admin')
    getDefault(): string {
        return "admin route"
    }

    @Get('admin/queue')
    async getArticleQueue() {
        return await this.adminService.getArticleQueue();
    }

    @Get('admin/queue/analyst')
    async getAnalystQueue() {
        return await this.adminService.getAnalystQueue();
    }
}