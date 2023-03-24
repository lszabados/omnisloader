import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { ProductList, ProductListItem } from "src/model/product";
import { AbasService } from "src/services/abasService";

@Controller('productlist')
export class ProductListController {
  constructor(private readonly abasService: AbasService) {
    
  }
  @Get('/:artikel/:lgrouppe')
  async productlist(@Param('artikel') artikel:string,@Param('lgrouppe') lgrouppe:string): Promise<ProductList[]> {
    console.log('list');
    if (!artikel || artikel.length == 0)
    {
      return [];
    }
    if (!lgrouppe || lgrouppe.length == 0)
    {
      lgrouppe = 'ERC';
    }
    try {
        return await this.abasService.GetProductList(artikel, lgrouppe);
    } catch (e) {
      let errTxt = "Hiba történt";
        if (e.error?.content?._type == 'AbasErpError')
        {
          errTxt = e.error?.content?.error?.text;

        }
        throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: errTxt,
          }, HttpStatus.FORBIDDEN, {
            cause: e
          });
    }
  }

  @Get('/:id')
  async productlistbyid(@Param('id') id: string): Promise<ProductList> {
    console.log('List/id');
    if (!id || id.length == 0)
    {
      return null;
    }
    
    try {
        return await this.abasService.GetProductListByID(id);
    } catch (e) {
      let errTxt = "Hiba történt";
        if (e.error?.content?._type == 'AbasErpError')
        {
          errTxt = e.error?.content?.error?.text;

        }
        throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: errTxt,
          }, HttpStatus.FORBIDDEN, {
            cause: e
          });
    }
  }

  @Post('pl/:id')
  async UpdateProductProductionList(@Param('id') id: string, @Body() body: {data: ProductListItem[]}) {
    return await this.abasService.UpdateProductProductionList(id, body.data);
  }

}