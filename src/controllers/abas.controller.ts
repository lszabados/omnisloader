import { Controller } from "@nestjs/common";
import { AbasService } from "src/services/abasService";

@Controller('abas')
export class AbasController {
  constructor(private readonly abasService: AbasService) {}

  
}