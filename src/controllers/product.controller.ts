import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Query } from "@nestjs/common";
import { ErpDataObjectInput } from "src/api/abasApi";
import { CreateOrUpdateProductModel, FindProductModel } from "src/model/find.product";
import { Product, ProductList, ProductListItem } from "src/model/product";
import { WarehouseGroup } from "src/model/warehouse-group";
import { AbasService } from "src/services/abasService";
import { HelperService } from "src/services/helper.service";

@Controller('product')
export class ProductController {
  constructor(private readonly abasService: AbasService, private readonly helperService:HelperService) {
    
  }

  @Get()
  async find(@Query() query: { criteria:string, widthTable?: boolean }): Promise<Product[]> {
    console.log('Find: ',query.criteria, query.widthTable);
    try {
        return await this.abasService.GetProducts(query.criteria, query.widthTable);
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

  @Get(':id')
  async findOne(@Param('id') id:string, @Query() query: {widthTable?: boolean}): Promise<Product> {
    console.log(':id');
    if (!id || !id.startsWith("(") || !id.endsWith(")"))
    {
      return null;
    }
    try {
        return await this.abasService.GetProduct(id, query.widthTable);
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

  @Put()
  async CreateProduct(@Body() body: ErpDataObjectInput):Promise<Product>{
    console.log('Put');
    try {
      return await this.abasService.CreateProduct(body);
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

  @Post(':id')
  async updateProduct(@Param('id') id: string, @Query() query: {field:string, value:string, withTable:boolean}): Promise<Product> {
    console.log('Post');
    if (!id || id.length == 0)
    {
      return null;
    }
    
    try {
        return await this.abasService.UpdateProduct(id, query.field, query.value, query.withTable);
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

  @Post()
  async createUpdateProduct(@Body() body: CreateOrUpdateProductModel): Promise<void> {
    console.log('CreateOrUpdate');
    
    try {
        const ret = await this.helperService.createOrUpdateProduct(body);
        //console.log(JSON.stringify(ret));
        return ret;
    } catch (e) {
      console.log("createUpdateProduct hiba: ",JSON.stringify(e));
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

  @Get('/find/:prodname')
  async FindData(@Param('prodname') prodname:string): Promise<FindProductModel> {
    console.log("Find: ", prodname);
    if (!prodname || prodname.length == 0)
    {
      return null;
    }
    
    try {
        return await this.helperService.findProductToUpdate(prodname);
    } catch (e) {
      console.log(e.error.content.error);
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


  @Get('/search/:filter')
  async search(@Param('filter') filter:string, @Query() query: { widthTable?: boolean }): Promise<Product[]> {
    console.log("Filter: ", filter);
    if (!filter || filter.length == 0)
    {
      return [];
    }
    try {
        return await this.abasService.SearchProducts(filter, query.widthTable);
    } catch (e) {
      console.log(e.error.content.error);
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

  @Get('/warehousegroup')
  async Warehousegroups(): Promise<WarehouseGroup[]> {
    try {
        return await this.abasService.GetWarehouseGroups();
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

  @Put('/custprod')
  async CreateCustomerProperty(@Query() query: {artikelid:string, klid:string, custcode:string}) {
    return await this.abasService.CreateCustomerProductProperties(query.artikelid, query.klid, query.custcode);
  }


}