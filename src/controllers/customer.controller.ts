import { Controller, Get, HttpException, HttpStatus, Param } from "@nestjs/common";
import { Customer } from "src/model/customer";
import { AbasService } from "src/services/abasService";

@Controller('customer')
export class CustomerController {
  constructor(private readonly abasService: AbasService) {}

  @Get()
  async findAll(): Promise<Customer[]> {
    try {
        return await this.abasService.GetCustomers("");
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
  async findOne(@Param('id') id: string): Promise<Customer> {
    try {
      if (!id || id.length == 0)
      {
        return null;
      }
      let criteria = "nummer=="+id;
      if (id.startsWith("(") && id.endsWith(")")) {
        criteria = "id=="+id;
      }

      const list = await this.abasService.GetCustomers(criteria);
      if (list && list.length > 0)
      {
        return list[0];
      }
      return null;
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