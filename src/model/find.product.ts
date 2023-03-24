import { Product, ProductListItem } from "./product";
import { WarehouseGroup } from "./warehouse-group";

export interface FindProductModel
{
    ERCData: Product|null,
    BERAMData:Product|null,
    OMNISData:Product|null,
    ERCKit:Product|null,
    Warehouses:WarehouseGroup[]|null,
    Errors:[
        {
            error?:string,
            message?:string
        }
    ]
}

export interface CreateOrUpdateProductModel {
    id?:string,
    product:Product,
    kit:ProductListItem[],
    warehouseid:string
}