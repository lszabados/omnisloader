import { Injectable, OnModuleDestroy } from '@nestjs/common';


@Injectable()
export class AppService implements OnModuleDestroy {

  constructor(){
  
  }

  onModuleDestroy() {
    
  }

  getHello(): string {
    return 'Hello World!';
  }

}
