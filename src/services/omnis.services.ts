import { INestApplication, Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { Product, ProductListItem } from "src/model/product";

// const prisma = new PrismaClient({
//     rejectOnNotFound: { findUnique: true },
//   });
  

@Injectable()
export class OmnisService extends PrismaClient implements OnModuleInit {

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async getProduct(productCode:string ):Promise<any> {
    //console.log(productCode);
    const products = await this.aRT_ANA.findMany({
      where: {
        COD_ART: productCode
      },
      select: {
        COD_ART:true,
        DES_ART:true,
        UM_BASE:true
      }
    });
    //console.log(products);

    if (products && products.length > 0)
    {
      const p = products[0];
      p.DES_ART = p.DES_ART.replace("\r\n","").replace(";","-");
      p.COD_ART = p.COD_ART; //.replace(",",".");
      return p;
    } else {
      return null;
    }
  }

  async getProductListWithNewNames(productCode:string, finalProduct:string):Promise<ProductListItem[]>{
    //console.log(productCode);

    const num:numberValue = new numberValue();
    const list = await this.getProductList(productCode, finalProduct, num);
    for (const item of list)
    {
      const newName = await this.productCodeChange(item.elex);
      // console.log("New name: ", newName, item.elex);
      item.elex = newName;
    }
    //const pairs = await prisma.CodeConvert
    return list;
  }

  async getProductList(productCode:string, finalProduct:string, num:numberValue, recursive:boolean=true):Promise<ProductListItem[]>{
    // console.log("Product list: " + productCode+", FinalProduct: "+finalProduct+", i: "+num.i.toString());
    if (!productCode)
    {
      //console.log("No product code: ("+productCode+"), finalProduct: ", finalProduct);
      return[];

    }
    if (!(await this.isHaveProductList(productCode)))
    {
        return [];
    }

    let contoLavoro:boolean = false;
    
    if (productCode.endsWith("CL"))
    {
      contoLavoro = true;
    }

    const list = await this.aRT_DIST.findMany({
      where:{
        COD_ART:productCode,
        COD_VERSIONE:"1" 
      }
    });

    const ret:ProductListItem[] = []; 
    
    for (const row of list)
    {
      if (recursive && (await this.isHaveProductList(row.COD_ART_COMP)))
      {
        const subList = await this.getProductList(row.COD_ART_COMP, finalProduct,num);
        ret.push(...subList);
      } else {
        num.i++;
        let melle = "Unit";
        if (row.UM == "ML") {
          melle = "m";
        } else if (row.UM == "PZ") {
          melle = "Unit";
        } else {
          melle = row.UM;
        }

        const newRow = new ProductListItem();
        newRow.rowid = num.i.toString();
        newRow.elex = row.COD_ART_COMP; //.replace(",",".");
        newRow.elanzahl = (Math.round(row.QUANT_UM_BASE*10000)/10000).toString(),
        newRow.melle = melle;
        newRow.bua = contoLavoro ? "(MaterialProvidedByCustomer)" : "";
        newRow.yeelem1 = productCode;
        newRow.elname = row.DES_DIST.replace("\r\n","").replace(";","-");
        newRow.yberamid = ""; 
        ret.push(newRow);
      }
    }

    return ret;
  }

  async isHaveProductList(productCode:string):Promise<boolean>{
    const i = await this.productListCount(productCode);
    //console.log("Product list count: ", i);
    return i > 0;
  }

  async isHaveProductCode(productCode:string):Promise<boolean>{
    const i = await this.aRT_ANA.findFirst({
      where: {
        COD_ART: productCode
      },
    });

    return i ? true : false;
  }

  async productListCount(productCode:string):Promise<number>{
    return await this.aRT_DIST.count({
      where: {
        COD_ART:productCode,
        COD_VERSIONE: "1"
      },
    });
  }

  async productCodeChange(productCode:string):Promise<string>{
    //console.log("Before Replace: ", productCode);
    const getcode = productCode.trim().replace(",",".").replace(",",".").replace(",",".").replace(",",".").replace(" ","").replace(" ","").replace(" ","").replace(" ","").replace(" ","");
    //console.log("Before Prisma: ", prisma);
    const ret = await this.codeConvert.findMany({
      where:{
        Original: getcode
      },
    });

    //console.log("Before Return: ", ret);
    if (ret && ret.length > 0)
    {
      return ret[0].ERCID;
    }

    return getcode;
  }
}

export class numberValue {
    public i:number = 0;
}