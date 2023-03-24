import { Controller, Get, HttpException, HttpStatus, Param, Res } from "@nestjs/common";
import { Employee } from "src/model/employee";
import { AbasService } from "src/services/abasService";
import { Response } from 'express';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly abasService: AbasService) {}

  @Get()
  async findAll(): Promise<Employee[]> {
    try {
        return await this.abasService.GetEmployees("");
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

  @Get('/nummer/:nummer')
  async findByNummer(@Param('nummer') nummer: string): Promise<Employee> {
    console.log('findByNummer', nummer);
    try {
        const data = await this.abasService.GetEmployees("nummer=="+nummer);
        console.log('findByNummer', JSON.stringify(data));
        if (data && data.length>0)
        {
          return data[0];
        } else {
          return null;
        }
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
  async findOne(@Param('id') id: string): Promise<Employee> {
    if (!id || !id.startsWith("(") || !id.endsWith(")"))
    {
      return null;
    }

    try {
        return await this.abasService.GetEmployee(id);
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