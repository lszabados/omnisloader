import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EmployeeController } from './controllers/employee.controller';
import { OmnisController } from './controllers/omnis.controller';
import { CustomerController } from './controllers/customer.controller';
import { AbasService } from './services/abasService';
import { OmnisService } from './services/omnis.services';
import { ProductController } from './controllers/product.controller';
import { HelperService } from './services/helper.service';
import { ProductListController } from './controllers/productlist.controller';
import { ProductBeramController } from './controllers/product.beram.controller';
import { WsService } from './services/ws.services';


@Module({
  imports: [ConfigModule.forRoot()
  ],
  controllers: [AppController, EmployeeController, OmnisController, CustomerController,ProductController,ProductListController,ProductBeramController],
  providers: [AppService, AbasService, OmnisService, HelperService, WsService],
})
export class AppModule {}
