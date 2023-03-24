import { Injectable, OnModuleDestroy, Scope } from "@nestjs/common";
import { Body } from "@nestjs/common/decorators";
import { ConfigService } from "@nestjs/config";
import { Api, CommonEditorCommands, DeleteRows, EditorCommandList, ErpDataObject, ErpDataObjectInput, ErpEditorObjectMeta, Field, RequestParams } from "src/api/abasApi";
import { Customer } from "src/model/customer";
import { Employee } from "src/model/employee";
import { CustomerProductProperty, Product, ProductList, ProductListItem, WarehouseGroupProperty } from "src/model/product";
import { WarehouseGroup } from "src/model/warehouse-group";
import { WorkspaceDto } from "src/model/workspace";
import { wsmodel } from "src/model/wsmodel";
import { WsService } from "./ws.services";



@Injectable({ scope: Scope.TRANSIENT })
export class AbasService implements OnModuleDestroy {
  
  private _api:Api<unknown>;

  private mandant:string;
  private berammandant:string;

  constructor(private configService: ConfigService, private wsService:WsService){
    this.mandant = this.configService.get<string>('MANDANT');
    this.berammandant = this.configService.get<string>('BERAMMANDANT');
    const baseApiParams: RequestParams = {
      credentials: 'same-origin',
      headers: {'Authorization': 'Basic ' + this.encode('_abas_:'+this.configService.get<string>('PASSWD')),
                'Accept-Language':'en'},
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    };
    this._api = new Api({
      baseApiParams:baseApiParams
    });

  }

  onModuleDestroy() {
  }

  /**
   * 
   * @param data string amit base64 kódolássá kell alakítani
   * @returns 
   */
  public encode(data:string):string {
    let buff = Buffer.from(data);
    return buff.toString('base64');
  }

  /**
   * 
   * @param data string amit base64 kódoéásról utf8-ra alakítunk vissza
   * @returns 
   */
  public decode(data:string):string {
    let buff = Buffer.from(data, 'base64');
    return buff.toString('utf8');
  }

  /**
   * Visszaadja a mezőlistából a névben meghatározott mező text érétkét
   * @param fields mezőlista ami az adatokat tartalmazza
   * @param name mezőnév aminek az adata kell
   * @returns 
   */
  private getText(fields:Field[] | undefined, name:string):string {
    const data = fields[name];
    if (data)
    {
      return data.text;
    } else return "";
  }
  
  /**
   * Visszaadja a mezőlistából a névben meghatározott mező value érétkét
   * @param fields mezőlista ami az adatokat tartalmazza
   * @param name mezőnév aminek az adata kell
   * @returns 
   */
  private getValue(fields:Field[] | undefined, name:string):string {
    const data = fields[name];
    if (data)
    {
      return data.value;
    } else return "";
  }


  // 
  /**
   * head vagy tale field list alapján kiolvassa a változók értékeit és beálítja az adott változóba
   * @param dest az objektum, ahova az értékeket másolni kell
   * @param fields adatokat tartalmazó Field tömb
   * @param attributes Mezőnevek, amiket keresünk, vesszővel elválasztott lista
   * @returns 
   */
  private getValues<T>(dest:T, fields:Field[], attributes:string):T
  {
    const nameList = attributes.split(',');
    
    for (const name of nameList)
    {
      const ret = this.getValue(fields, name);
      if (ret && ret.length > 1)
      {
        dest[name] = ret;
      }
    }
    return dest;
  }

  private getValuesBeram<T>(dest:T, fields:Field[], attributes:string):T
  {
    const nameList = attributes.split(',');
    
    for (const name of nameList)
    {
      const ret = this.getValue(fields, name);
      if (ret && ret.length > 1)
      {
        if (name === "yercid")
        {
          dest["yberamid"] = ret;
        } else {
          dest[name] = ret;
        }
      }
    }
    return dest;
  }

  async CreateTable(table:string, data:ErpDataObjectInput) {
    const d = await this._api.r.createNew(this.mandant, table, data);
  }


  /**
   *  Visszaadja a dolgozók listáját, max 100-at
   */
  async GetEmployees(criteria:string):Promise<Employee[]>{
    const headFields = 'id,nummer,such,namebspr,kenn';

    const tableFields = "-";

    const list = await this._api.r.getList(this.mandant, "11:1", {criteria:criteria, headFields:headFields, tableFields:tableFields, limit:200});
    
    if (list.ok && list.data)
    {
      const items = list.data.content.data.erpDataObjects.map(item =>{
        console.log(item.head.fields);
        return this.getValues<Employee>(new Employee(), item.head.fields, headFields);
      });

      return items;
      
    } else {
      return [];
    }
  }

  /**
   * Egy dolgozó adatait adja vissza
   * @param nummer dolgozó nummer értéke
   * @returns 
   */
  async GetEmployee(id:string):Promise<Employee>{
    const headFields = 'id,nummer,such,namebspr,kenn';
    const tableFields = "-";
    const item = await this._api.r.getRecord(this.mandant, "11:1", id, {headFields:headFields, tableFields:tableFields});
    if (item.data)
    {
      return this.getValues<Employee>(new Employee(), item.data.content.data.head.fields, headFields);    
    } else {
      return null;
    }
  }

  /**
   * Termékeket keres, max 10-et ad vissza
   * @param criteria Feltétel ami alapján keres
   * @param withTable igazra kell állítani, ha kérjük a gyártási litát is
   * @returns Talált termékek
   */
  async GetProducts(criteria:string,widthTable:boolean=false):Promise<Product[]>{
    const headFields = "id,nummer,such,namebspr,le,vkbez,ystato,yelem1,yberamid,bem,bestand,bsart,gtin";
    const tableFields = widthTable ? "zn,elex,elname,elanzahl,melle,bua,elex^yelem1" : "-";
    //console.log("Product: ", criteria, widthTable);
    const list = await this._api.r.getList(this.mandant, "2:1", {criteria:criteria, headFields:headFields, tableFields:tableFields, limit:10});
    
    if (list.data)
    {
      //console.log("Erc: ",list.data.content.data.erpDataObjects);
      const items = list.data.content.data.erpDataObjects.map(item =>{
        const prod = this.getValues<Product>(new Product(), item.head.fields, headFields);
        if (item.table && item.table.length > 0)
        {
          for (const row of item.table) {
            //console.log("Row: ", row);
            const prodRow = new ProductListItem();
            prodRow.rowid = this.getValue(row.fields, "zn");
            prodRow.elexid = this.getValue(row.fields, "elex");
            prodRow.elex = this.getText(row.fields, "elex");
            prodRow.elname = this.getText(row.fields, "elname");
            prodRow.elanzahl = this.getValue(row.fields, "elanzahl");
            prodRow.melle = this.getText(row.fields, "melle");
            prodRow.bua = this.getValue(row.fields, "bua");
            prodRow.yeelem1 = this.getValue(row.fields, "elex^yelem1");
            prod.table.push(prodRow);
          }
        }
        return prod;
      });

      //console.log("Erc result: ",items.length, widthTable);
      if (widthTable)
      {
        for (const it of items)
        {
          it.wgp = await this.GetWarehouseGroupByProduct(it.id);
          it.cpp = await this.GetCustomerProductPropertiesByProduct(it.id);
        }
      }
        
      return items;
      
    } else {
      return [];
    }
  }

  /**
   * Termékeket keres, max 10-et ad vissza
   * @param criteria Feltétel ami alapján keres
   * @param withTable igazra kell állítani, ha kérjük a gyártási litát is
   * @returns Talált termékek
   */
  async GetProductsBeram(criteria:string,withTable:boolean=false):Promise<Product[]>{
    const headFields = "id,nummer,such,namebspr,le,vkbez,ystato,yelem1,yercid,bem,bestand,bsart,gtin";
    const tableFields = withTable ? "zn,elex,elname,elanzahl,melle,bua,elex^yelem1,elex^yercid" : "-";

    const list = await this._api.r.getList(this.berammandant, "2:1", {criteria:criteria, headFields:headFields, tableFields:tableFields, limit:10});
    
    if (list.data)
    {
      //console.log("Beram: ",list.data.content.data.erpDataObjects);
      const items = list.data.content.data.erpDataObjects.map(item =>{
        const prod = this.getValuesBeram<Product>(new Product(), item.head.fields, headFields);
        if (item.table && item.table.length > 0)
        {
          for (const row of item.table) {
            //console.log("Row: ", row);
            const prodRow = new ProductListItem();
            prodRow.rowid = this.getValue(row.fields, "zn");
            prodRow.elexid = this.getValue(row.fields, "elex");
            prodRow.elex = this.getText(row.fields, "elex");
            prodRow.elname = this.getText(row.fields, "elname");
            prodRow.elanzahl = this.getValue(row.fields, "elanzahl");
            prodRow.melle = this.getText(row.fields, "melle");
            prodRow.bua = this.getValue(row.fields, "bua");
            prodRow.yeelem1 = this.getValue(row.fields, "elex^yelem1");
            prodRow.yberamid = this.getValue(row.fields, "elex^yercid");
            if (prodRow.elex.startsWith("A ")) {
              continue;
            }
            prod.table.push(prodRow);
          }
        }
        return prod;
      });

      return items;
      
    } else {
      return [];
    }
  }

  /**
   * Termékeket keres, max 10-et ad vissza
   * @param id Product id
   * @param withTable igazra kell állítani, ha kérjük a gyártási litát is
   * @returns Talált termékek
   */
  async GetProduct(id:string,withTable:boolean=false):Promise<Product>{
    const headFields = "id,nummer,such,namebspr,le,vkbez,ystato,yelem1,yberamid,bem,bestand,bsart,gtin";
    const tableFields = withTable ? "zn,elex,elname,elanzahl,melle,bua,elex^yelem1" : "-";

    const item = await this._api.r.getRecord(this.mandant, "2:1", id,  {headFields:headFields, tableFields:tableFields});
    
    if (item.data)
    {
      const prod = this.getValues<Product>(new Product(), item.data.content.data.head.fields, headFields);

      if (item.data.content.data.table && item.data.content.data.table.length > 0)
      {
        for (const row of item.data.content.data.table) {
          //console.log("Row: ", row);
          const prodRow = new ProductListItem();
          prodRow.rowid = this.getValue(row.fields, "zn");
          prodRow.elexid = this.getValue(row.fields, "elex");
          prodRow.elex = this.getText(row.fields, "elex");
          prodRow.elname = this.getText(row.fields, "elname");
          prodRow.elanzahl = this.getValue(row.fields, "elanzahl");
          prodRow.melle = this.getText(row.fields, "melle");
          prodRow.bua = this.getValue(row.fields, "bua");
          prodRow.yeelem1 = this.getValue(row.fields, "elex^yelem1");
          prod.table.push(prodRow);
        }
      }
      
      if (withTable)
      {
        prod.wgp  = await this.GetWarehouseGroupByProduct(prod.id);
        prod.cpp = await this.GetCustomerProductPropertiesByProduct(prod.id);  
      }
      
      return prod;
      
    } else {
      return null;
    }
  }

  /**
   * Raktárhelyen listázza ki az elérhető termékeket
   * @param location
   * @param withTable 
   * @returns 
   */
  async FindProductsFromLocation(location:string,withTable:boolean=false):Promise<Product[]>{
    const headFields = "artikel";
    const tableFields = "-";
    const criteria = "platz=="+location;

    const list = await this._api.r.getList(this.mandant, "40:0", {criteria:criteria, headFields:headFields, tableFields:tableFields});
    
    if (list.data)
    {
      const items = list.data.content.data.erpDataObjects.map(item =>{
        const prod = this.getValue(item.head.fields, headFields);
      
        return prod;
      });

      const prodRet:Product[] = [];
      for (const id of items)
      {
        const pr = await this.GetProduct(id, withTable);
        if (pr) prodRet.push(pr);
      }
      
      return prodRet;

    } else {
      return [];
    }
  }

  /**
   * Több feltétel alapján, több helyen keresi a termékeket
   * @param criteria kód amit keresünk
   * @param withTable igazra kell állítani, ha kérjük a gyártási litát is
   * @returns Talált termékek
   */
  async SearchProducts(filter:string,withTable:boolean=false):Promise<Product[]>{
    
    let criteria = "such=="+filter+";gtin=="+filter+";yberamid=="+filter+";@link=(Or)";
    if (filter.startsWith("(") && filter.endsWith(")"))
    {
      criteria = "id=="+filter;
    } else if (filter.startsWith("{") && filter.endsWith("}")) {
      criteria = "nummer=="+filter;
    }

    console.log("Criteria: ",criteria);
    const ret = await this.GetProducts(criteria, withTable);
  
    if (ret && ret.length > 0)
    {
      return ret;
    }

   

    // itt kell a raktárhelyet keresni!!!
    const ret2 = await this.FindProductsFromLocation(filter, withTable);
    return ret2;
  }

  async UpdateRecord(id:string, table:string, body:ErpDataObjectInput) {
    await this._api.r.updateRecord(this.mandant, table, id, body);
  }

  async UpdateProduct(id:string, field:string, value:string, withTable:boolean = false):Promise<Product> {
    await this.UpdateRecord(id, "2:1", {
      head : { 
        fields : [
          {
            name : field,
            text : value
          }
        ]
      }
    });

    return await this.GetProduct(id, withTable);
  }

  async CreateProduct(data:ErpDataObjectInput, withTable:boolean=false):Promise<Product> {
    try{
      console.log("CreateTable param: ", JSON.stringify(data));
      await this.CreateTable("2:1", data);
      console.log("CreateTable OK",JSON.stringify(data));
    } catch (e) {
      console.log("CreateTable error ", JSON.stringify(e));
      throw new Error(e);
    }
    
    const such = data.head.fields.find(c=>c.name == "such")?.text;
    console.log("SUCH",such);
    if (such && such.length > 0)
    {
      const ret = await this.GetProducts("such=="+such, withTable);
      console.log("CreateTable result:", JSON.stringify(ret));
      if (ret && ret.length>0)
      {
        return ret[0];
      }
    }

    return null; 
  }

  /**
   * Kilistázza a raktárcsoportokat
   * @returns 
   */
  async GetWarehouseGroups():Promise<WarehouseGroup[]>
  {
    const headFields = "id,nummer,such,namebspr,zuplatz,abplatz";
    const tableFields = "-";

    const list = await this._api.r.getList(this.mandant, "39:02", {headFields:headFields, tableFields:tableFields, limit:20});
    
    if (list.data)
    {
      const items = list.data.content.data.erpDataObjects.map(item =>{
        const prod = this.getValues<WarehouseGroup>(new WarehouseGroup(), item.head.fields, headFields);
        return prod;
      });

      return items;
      
    } else {
      return [];
    }
  }

  /**
   * Kilistázza a a hozzárendelt külső raktárcsoportokat
   * @returns 
   */
  async GetWarehouseGroupByProduct(artikelid:string):Promise<WarehouseGroupProperty[]>
  {
    const headFields = "artikel,lgruppe,flistestd,zuplatz,abplatz,dispoa,bsart,lief,eprg";
    const tableFields = "-";
    const criteria = "artikel=="+artikelid;
    const list = await this._api.r.getList(this.mandant, "39:03", {criteria:criteria, headFields:headFields, tableFields:tableFields, limit:20});
    const ret:WarehouseGroupProperty[] = [];
    //console.log("Get warehouse response", JSON.stringify(list), list.data.content.data.erpDataObjects.length);
    if (list.data && list.data.content.data.erpDataObjects.length > 0)
    {
      for (const row of list.data.content.data.erpDataObjects)
      {
        const wgp = new WarehouseGroupProperty();
        wgp.abplatz = this.getValue(row.head.fields, "abplatz");
        wgp.zuplatz = this.getValue(row.head.fields, "abplatz");
        wgp.bsart = this.getValue(row.head.fields, "bsart");
        wgp.dispoa = this.getValue(row.head.fields, "dispoa");
        wgp.eprg = this.getValue(row.head.fields, "eprg");
        wgp.flistestdid = this.getValue(row.head.fields, "flistestd");
        wgp.lgruppe = this.getText(row.head.fields, "lgruppe");
        wgp.lgruppeid = this.getValue(row.head.fields, "lgruppe");
        wgp.lief = this.getText(row.head.fields, "lief");
        wgp.liefid = this.getValue(row.head.fields, "lief");
        ret.push(wgp);  
      }
      
      //console.log("Get warehouse",artikelid, ret);
      return ret;
      
    } else {
      //console.log("Get warehouse not found..");
      return [];
    }
  }

  async GetCustomerProductPropertiesByProduct(artikelid:string):Promise<CustomerProductProperty[]>
  {
    const headFields = "id,kl,kl^such,kuartnr";
    const tableFields = "-";
    const criteria = "artikel=="+artikelid;
    const list = await this._api.r.getList(this.mandant, "2:6", {criteria:criteria, headFields:headFields, tableFields:tableFields, limit:5});
    const ret:CustomerProductProperty[] = [];
    if (list.data && list.data.content.data.erpDataObjects.length > 0)
    {
      const data = list.data.content.data.erpDataObjects.map(r=>{
        const item = new CustomerProductProperty();
        item.id = this.getValue(r.head.fields, "id");
        item.klid = this.getValue(r.head.fields, "kl");
        item.klnummer = this.getText(r.head.fields, "kl");
        item.klsuch = this.getText(r.head.fields, "kl^such");
        item.prodnumber = this.getValue(r.head.fields, "kuartnr");
        return item;
      });
      return data;
    } else {
      return [];
    }
  }

  

  async CreateWarehouseGroup(artikelid:string,lgruppe:string,bsart:string,lief:string):Promise<WarehouseGroupProperty> {
    const ret = await this.GetWarehouseGroupByProduct(artikelid);
    let rowNum:number=1;
    if (ret && ret.length>0)
    {
      rowNum = ret.length+1;
    }

    //console.log("WH Get1: ", rowNum);

    // nyitunk egy editort
    const ws1 = await this.wsService.GetDatabaseObjectWorkspaceEditor("2:1", artikelid, "UPDATE");

    //console.log("WH ws1: ", JSON.stringify(ws1));
    // nyitunk subeditort
    const ws2 = await this.wsService.GetHeaderSubeditor(ws1, "alge");
    // hozzáadjuk a sort
    //console.log("WH ws2: ", JSON.stringify(ws2));
    
    const data:EditorCommandList = {
      actions:[]
    };
    
    try{
      data.actions.push({
        _type: "InsertRow",
        rowSpec:rowNum.toString(),
        dialogAnswers:[]
      });
    
      data.actions.push({
        _type: "SetFieldValue",
        fieldName:"lgruppe",
        value:lgruppe,
        rowSpec:rowNum.toString(),
        dialogAnswers:[]
      });
  
      data.actions.push({
        _type: "SetFieldValue",
        fieldName:"bsart",
        value:bsart,
        rowSpec:rowNum.toString(),
        dialogAnswers:[]
      });
  
      data.actions.push({
        _type: "SetFieldValue",
        fieldName:"lief",
        value:lief,
        rowSpec:rowNum.toString(),
        dialogAnswers:[]
      });
  
      data.actions.push({
        _type: "Commit",
        dialogAnswers:[]
      });
    }
    catch (e) {
      console.log(JSON.stringify(e));
    }
    
    try 
    {
      //console.log("WH Data: ", JSON.stringify(data));
      const ret1 = await this.wsService.postWorkingSetEditorCommand(ws2, data);
      //console.log("WH Ret1: ", JSON.stringify(ret1));
      // lezárjuk a subeditort
      const ret2 = await this.wsService.workingSetEditorCommit(ws1);
      //console.log("WH Ret2: ", JSON.stringify(ret2));
      // lezárjuk a workspacet
      const ret3 = await this.wsService.postWorkingSetCommand(ws1.workingset, "CLOSE");
      //console.log("WH Ret3: ", JSON.stringify(ret3));
  
      const retx = await this.GetWarehouseGroupByProduct(artikelid);
      
      if (retx && retx.length>0)
      {
        //console.log("WHResult: ", JSON.stringify(retx));
        return retx.find(c=>c.lgruppeid == lgruppe);
      }
    }
    catch (e) {
      await this.wsService.workingSetEditorCancel(ws1);
      await this.wsService.postWorkingSetCommand(ws1.workingset, 'CLOSE');
      JSON.stringify(e);
      throw e;
    }
    

    return null;
  }

  async CreateCustomerProductProperties(artikelid:string,customerid:string,productnummer:string):Promise<CustomerProductProperty> {
    const ret = await this.GetCustomerProductPropertiesByProduct(artikelid);
    let rowNum:number=1;
    if (ret && ret.length>0)
    {
      rowNum = ret.length+1;
    }

    console.log("ccp: ", JSON.stringify(ret));

    if (ret.findIndex(c=>c.klid == customerid) > -1)
    {
      return ret.find(c=>c.klid == customerid);
    }

    //console.log("WH Get1: ", rowNum);

    // nyitunk egy editort
    const ws1 = await this.wsService.GetDatabaseObjectWorkspaceEditor("2:1", artikelid, "UPDATE");

    //console.log("WH ws1: ", JSON.stringify(ws1));
    // nyitunk subeditort
    const ws2 = await this.wsService.GetHeaderSubeditor(ws1, "akle");
    // hozzáadjuk a sort
    //console.log("WH ws2: ", JSON.stringify(ws2));
    
    const data:EditorCommandList = {
      actions:[]
    };
    
    try{
      data.actions.push({
        _type: "InsertRow",
        rowSpec:rowNum.toString(),
        dialogAnswers:[]
      });
    
      data.actions.push({
        _type: "SetFieldValue",
        fieldName:"kl",
        value:customerid,
        rowSpec:rowNum.toString(),
        dialogAnswers:[]
      });
  
      data.actions.push({
        _type: "SetFieldValue",
        fieldName:"kuartnr",
        value:productnummer,
        rowSpec:rowNum.toString(),
        dialogAnswers:[]
      });
  
      data.actions.push({
        _type: "Commit",
        dialogAnswers:[]
      });
    }
    catch (e) {
      console.log(JSON.stringify(e));
    }
    
    try 
    {
      //console.log("WH Data: ", JSON.stringify(data));
      const ret1 = await this.wsService.postWorkingSetEditorCommand(ws2, data);
      //console.log("WH Ret1: ", JSON.stringify(ret1));
      // lezárjuk a subeditort
      const ret2 = await this.wsService.workingSetEditorCommit(ws1);
      //console.log("WH Ret2: ", JSON.stringify(ret2));
      // lezárjuk a workspacet
      const ret3 = await this.wsService.postWorkingSetCommand(ws1.workingset, "CLOSE");
      //console.log("WH Ret3: ", JSON.stringify(ret3));
  
      const retx = await this.GetCustomerProductPropertiesByProduct(artikelid);
      
      if (retx && retx.length>0)
      {
        //console.log("WHResult: ", JSON.stringify(retx));
        return retx.find(c=>c.klid == customerid);
      }
    }
    catch (e) {
      await this.wsService.workingSetEditorCancel(ws1);
      await this.wsService.postWorkingSetCommand(ws1.workingset, 'CLOSE');
      JSON.stringify(e);
      throw e;
    }
    
    return null;
  }

  async UpdateCustomerProductProperties(artikelid: string, customerid:string, prodnumber: string) {
    
    // nyitunk egy editort
    const ws1 = await this.wsService.GetDatabaseObjectWorkspaceEditor("2:1", artikelid, "UPDATE");

    // nyitunk subeditort
    const ws2 = await this.wsService.GetHeaderSubeditor(ws1, "akle");
    
    const data:EditorCommandList = {
      actions:[]
    };
    
    try{
      
      data.actions.push({
        _type: "SetFieldValue",
        fieldName:"kuartnr",
        value:prodnumber,
        rowSpec: "$,,kl=="+customerid,
        dialogAnswers:[]
      });
  
      data.actions.push({
        _type: "Commit",
        dialogAnswers:[]
      });
    }
    catch (e) {
      console.log(JSON.stringify(e));
    }
    
    try 
    {
      //console.log("WH Data: ", JSON.stringify(data));
      const ret1 = await this.wsService.postWorkingSetEditorCommand(ws2, data);
      //console.log("WH Ret1: ", JSON.stringify(ret1));
      // lezárjuk a subeditort
      const ret2 = await this.wsService.workingSetEditorCommit(ws1);
      //console.log("WH Ret2: ", JSON.stringify(ret2));
      // lezárjuk a workspacet
      const ret3 = await this.wsService.postWorkingSetCommand(ws1.workingset, "CLOSE");
      //console.log("WH Ret3: ", JSON.stringify(ret3));
  
      const retx = await this.GetCustomerProductPropertiesByProduct(artikelid);
      
      if (retx && retx.length>0)
      {
        //console.log("WHResult: ", JSON.stringify(retx));
        return retx.find(c=>c.klid == customerid);
      }
    }
    catch (e) {
      await this.wsService.workingSetEditorCancel(ws1);
      await this.wsService.postWorkingSetCommand(ws1.workingset, 'CLOSE');
      JSON.stringify(e);
      throw e;
    }
    
    return null;
  }



  /**
   * Kilistázza a vevőket
   * @returns 
   */
  async GetCustomers(criteria:string):Promise<Customer[]>
  {
    const headFields = "id,nummer,such,namebspr";
    const tableFields = "-";

    const list = await this._api.r.getList(this.mandant, "0:1", {criteria:criteria, headFields:headFields, tableFields:tableFields, limit:20});
    
    if (list.data)
    {
      const items = list.data.content.data.erpDataObjects.map(item =>{
        const prod = this.getValues<Customer>(new Customer(), item.head.fields, headFields);
        return prod;
      });

      return items;
      
    } else {
      return [];
    }
  }

  async GetProductList(artikel:string,lgrouppe:string):Promise<ProductList[]>{
    const headFields = "id,nummer,artikel,lgruppe";
    const tableFields = "zn,elex,elname,elanzahl,melle,bua";
    const criteria = "artikel=="+artikel+";lgruppe=="+lgrouppe;
    try {
      const list = await this._api.r.getList(this.mandant, "128:1", {criteria:criteria, headFields:headFields, tableFields:tableFields});
      const pl:ProductList[] = [];
      if (list.data?.content.data.erpDataObjects.length > 0)
      {
        for (const data of list.data?.content.data.erpDataObjects)
        {
          const ret = new ProductList();
          ret.artikelid = this.getValue(data.head.fields, "artikel");
          ret.artikel = this.getText(data.head.fields, "artikel");
          ret.lgruppe = this.getText(data.head.fields, "lgruppe");
          ret.id = this.getValue(data.head.fields, "id");
          ret.nummer = this.getValue(data.head.fields, "nummer");
    
          if (data.table?.length > 0)
          {
            for (const row of data.table) {
              const prodRow = new ProductListItem();
              prodRow.rowid = this.getValue(row.fields, "zn");
              prodRow.elexid = this.getValue(row.fields, "elex");
              prodRow.elex = this.getText(row.fields, "elex");
              prodRow.elname = this.getText(row.fields, "elname");
              prodRow.elanzahl = this.getValue(row.fields, "elanzahl");
              prodRow.melle = this.getText(row.fields, "melle");
              prodRow.bua = this.getValue(row.fields, "bua");
              ret.table.push(prodRow);
            }
          }
          pl.push(ret);
        }
        return pl;
      }
      else {
        return [];
      }
    } catch (e) {
      console.log("Get product list error: ", JSON.stringify(e));
      return [];
    }
  }

  async GetProductListByID(id:string):Promise<ProductList>{
    const headFields = "id,nummer,artikel,lgruppe";
    const tableFields = "zn,elex,elname,elanzahl,melle,bua";
    
    const item = await this._api.r.getRecord(this.mandant, "128:1", id, {headFields:headFields, tableFields:tableFields});
    
    if (item && item.data)
    {
      const data = item.data.content.data;
      const ret = new ProductList();
      ret.artikelid = this.getValue(data.head.fields, "artikel");
      ret.artikel = this.getText(data.head.fields, "artikel");
      ret.lgruppe = this.getText(data.head.fields, "lgruppe");
      ret.id = this.getValue(data.head.fields, "id");
      ret.nummer = this.getValue(data.head.fields, "nummer");
      ret.flistestd = this.getValue(data.head.fields, "flistestd");
      ret.such = this.getValue(data.head.fields, "such");

      if (data.table?.length > 0)
      {
        for (const row of data.table) {
          const prodRow = new ProductListItem();
          prodRow.rowid = this.getValue(row.fields, "zn");
          prodRow.elexid = this.getValue(row.fields, "elex");
          prodRow.elex = this.getText(row.fields, "elex");
          prodRow.elname = this.getText(row.fields, "elname");
          prodRow.elanzahl = this.getValue(row.fields, "elanzahl");
          prodRow.melle = this.getText(row.fields, "melle");
          prodRow.bua = this.getValue(row.fields, "bua");
          ret.table.push(prodRow);
        }
      }
      return ret;
    }
    else {
      return null;
    }
  }

  async CreateProductList(artikel:string, lgruppe:string,flistestd:boolean):Promise<ProductList>{
    console.log("Create product list", artikel, lgruppe, flistestd);
    await this.CreateTable("128:1", {
      head:{
        fields: [
          {
            name: "such",
            text: "KIT"
          },
          {
            name:"artikel",
            text: artikel,
          },
          {
            name:"lgruppe",
            text: lgruppe,
          },
          {
            name:"flistestd",
            text: flistestd ? "true": "false",
          }
        ]
      }
    });
    
    // utolsó product list
    const pl = await this.GetProductList(artikel, lgruppe);
    console.log("Product lists", JSON.stringify(pl));
    if (pl && pl.length > 0) {
      return pl[pl.length-1];
    } else {
      return null;
    }
    
  }

  async CreateProductList2(such:string,artikel:string, lgruppe:string){
    console.log("Create product list start");
    const ws = await this.wsService.postDatabaseCommand("128:1", "NEW");
    try {
      const ec:EditorCommandList = {
        actions:[
          {
            _type:"SetFieldValue",
            "fieldName": "artikel",
            "value": artikel,
            dialogAnswers:[]
          },
          {
            _type:"SetFieldValue",
            "fieldName": "lgruppe",
            "value": lgruppe,
            dialogAnswers:[]
          },
          {
            _type:"SetFieldValue",
            "fieldName": "such",
            "value": such,
            dialogAnswers:[]
          }
        ]
      };
      const ret2 = await this.wsService.postWorkingSetEditorCommand(ws, ec);
      const ret3 = await this.wsService.workingSetEditorCommit(ws);
      await this.wsService.postWorkingSetCommand(ws.workingset, 'CLOSE');
    }
    catch (e) {
      await this.wsService.workingSetEditorCancel(ws);
      await this.wsService.postWorkingSetCommand(ws.workingset, 'CLOSE');
      console.log(JSON.stringify(e));
    }
    console.log("Create product list end!");
    const pl = await this.GetProductList(artikel, lgruppe);
    if (pl && pl.length>0)
    {
      return pl[pl.length-1];
    } else {
      return null;
    }
  }

  async updateProductList2(id:string,data:ProductListItem[], flistestd:number = 0){
    console.log("update product list start");
    const ws = await this.wsService.GetDatabaseObjectWorkspaceEditor("128:1", id, "UPDATE");
    try {
      const ec:EditorCommandList = {actions:[]};
      if (flistestd>0)
      {
        ec.actions.push({
          _type:"SetFieldValue",
          "fieldName": "flistestd",
          "value": flistestd == 1 ? "false" : "true",
          dialogAnswers:[]
        });
      }
      
      for (const row of data)
      {
        ec.actions.push({
          _type:"InsertRow",
          dialogAnswers:[]
        });
        ec.actions.push({
          _type: "SetFieldValue",
          fieldName: "rowid",
          value: row.rowid,
          rowSpec: ".",
          dialogAnswers:[]
        });
        ec.actions.push({
          _type: "SetFieldValue",
          fieldName: "elex",
          value: row.elexid,
          rowSpec: ".",
          dialogAnswers:[]
        });
        ec.actions.push({
          _type: "SetFieldValue",
          fieldName: "elanzahl",
          value: row.elanzahl,
          rowSpec: ".",
          dialogAnswers:[]
        });
        ec.actions.push({
          _type: "SetFieldValue",
          fieldName: "bua",
          value: row.bua,
          rowSpec: ".",
          dialogAnswers:[]
        });
      }

      const ret2 = await this.wsService.postWorkingSetEditorCommand(ws, ec);
      const ret3 = await this.wsService.workingSetEditorCommit(ws);
      await this.wsService.postWorkingSetCommand(ws.workingset, 'CLOSE');
    }
    catch (e) {
      await this.wsService.workingSetEditorCancel(ws);
      await this.wsService.postWorkingSetCommand(ws.workingset, 'CLOSE');
      console.log(JSON.stringify(e));
    }
    console.log("Create product list end!");
    const pl = await this.GetProductListByID(id);
    return pl;
  }

  //----------------------------------- workspaces -----------------------------------
  async NewDeliveryNoteWorkspace(table:string, id:string):Promise<WorkspaceDto> {

    const headerFields = 'id,kunde,vorgartaz,beleg';
    const tableFields = 'pnum,pmgrp,stufe,zkuartnr,artikel,mge,price,platz';
    const resp = await this._api.r.postCommand2(this.mandant, "3:23", "NEW", {}, {filterHeadFields:headerFields, filterTableFields:tableFields});
    if (resp.status == 201)
    {
      const ws = new WorkspaceDto();
      ws.workingset = resp.headers['x-abas-mw-workingset'];
      ws.workingseteditor = resp.headers['x-abas-mw-workingseteditor'];
      return ws;
    }
    return null;
  }
  
  async UpdateProductProductionList(productid:string, data:ProductListItem[]) {
    //console.log("UpdateProductProductionList id: ", productid, JSON.stringify(data));
    const d:CommonEditorCommands = {
      initAction: {
        tableName: "2:1",
        _type:"OpenEditor",
        editAction: "UPDATE",
        editRefID: productid,
        dialogAnswers: [],
        screenEnterDialogAnswers:[]
      },
      actions: [
      ],

    };
    
    for (const row of data)
    {
      d.actions.push({ 
        _type: "InsertRow",
        dialogAnswers:[]
      });

      d.actions.push({ 
        _type: "SetFieldValue",
        fieldName: "elex",
        value:row.elexid,
        rowSpec:".",
        dialogAnswers:[]
      });

      d.actions.push({ 
        _type: "SetFieldValue",
        fieldName: "elanzahl",
        value:row.elanzahl,
        rowSpec:".",
        dialogAnswers:[]
      });

      d.actions.push({ 
        _type: "SetFieldValue",
        fieldName: "bua",
        value:row.bua,
        rowSpec:".",
        dialogAnswers:[]
      });
    }

    //console.log("UpdateProductProductionList data: ", JSON.stringify(d));

    const resp = await this._api.r.execute(this.mandant, d);

    //console.log("UpdateProductProductionList resp: ", JSON.stringify(resp));

  }

  async UpdateProductionList(productListId:string, data:ProductListItem[], flistestd:boolean = false) {
    console.log("UpdateProductionList id: ", productListId);
    const d:CommonEditorCommands = {
      initAction: {
        tableName: "128:1",
        _type:"OpenEditor",
        editAction: "UPDATE",
        editRefID: productListId,
        dialogAnswers: [],
        screenEnterDialogAnswers:[]
      },
      actions: [
      ],

    };

    if (flistestd) {
      d.actions.push({ 
        _type: "SetFieldValue",
        fieldName: "flistestd",
        value: "true",
        dialogAnswers:[]
      });
    }

    for (const row of data)
    {
      
      d.actions.push({ 
        _type: "InsertRow",
        dialogAnswers:[]
      });

      d.actions.push({ 
        _type: "SetFieldValue",
        fieldName: "elex",
        value:row.elexid,
        rowSpec:".",
        dialogAnswers:[]
      });

      d.actions.push({ 
        _type: "SetFieldValue",
        fieldName: "elanzahl",
        value:row.elanzahl,
        rowSpec:".",
        dialogAnswers:[]
      });

      d.actions.push({ 
        _type: "SetFieldValue",
        fieldName: "bua",
        value:row.bua,
        rowSpec:".",
        dialogAnswers:[]
      });
    }

    const resp = await this._api.r.execute(this.mandant, d);
  }

}