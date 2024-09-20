"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT') || 5000;
    app.enableCors();
    await app.listen(port);
    common_1.Logger.log(`Application is running on http://localhost:${port}`, 'Speed');
}
bootstrap();
//# sourceMappingURL=main.js.map