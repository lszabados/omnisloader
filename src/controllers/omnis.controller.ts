import { Controller, Get, Query } from '@nestjs/common';
import { ProductListItem } from 'src/model/product';
import { OmnisService } from 'src/services/omnis.services';


@Controller('omnis')
export class OmnisController {
  constructor(private readonly omnisService: OmnisService) {}

  @Get("/finalproduct")
  async getFinalProduct(@Query('productCode') productCode):Promise<any> {
    const ret = await this.omnisService.getProduct(productCode);
    //console.log(ret);
    return ret;
  }

  @Get("/productlist")
  async getProductList(@Query('productCode') productCode):Promise<ProductListItem[]> {
    //console.log(productCode);
    const ret = await this.omnisService.getProductListWithNewNames(productCode, productCode);
    //console.log(ret);
    return ret;
  }

  @Get("/codecahnge")
  async getProductCodeCahnge(@Query('productCode') productCode):Promise<any> {
    //console.log(productCode);
    const ret = await this.omnisService.productCodeChange(productCode);
    //console.log(ret);
    return {data: ret};
  }
}
