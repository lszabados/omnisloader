import { Controller, Get, HttpException, HttpStatus, Param, Query } from "@nestjs/common";
import { Product } from "src/model/product";
import { AbasService } from "src/services/abasService";

@Controller('productberam')
export class ProductBeramController {
  constructor(private readonly abasService: AbasService) {
    
  }

  @Get(":criteria")
  async findBeram(@Param('criteria') criteria:string,@Query() query: { widthTable?: boolean}): Promise<Product[]> {
    console.log('FindBeram', query.widthTable);
    try {
        return await this.abasService.GetProductsBeram(criteria, query.widthTable);
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
}
