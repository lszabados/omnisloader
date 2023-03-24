import { Injectable, OnModuleDestroy, Scope } from "@nestjs/common";
import { ErpDataObjectInput } from "src/api/abasApi";
import { CreateOrUpdateProductModel, FindProductModel } from "src/model/find.product";
import { Product, ProductList, ProductListItem } from "src/model/product";
import { AbasService } from "./abasService";
import { OmnisService } from "./omnis.services";

@Injectable({ scope: Scope.TRANSIENT })
export class HelperService implements OnModuleDestroy {
    
    constructor(private omnisService:OmnisService, private abasService:AbasService){
        
    }

    async findProductToUpdate(productCode:string):Promise<FindProductModel>
    {
        const ret:FindProductModel = {ERCData : null, BERAMData:null, OMNISData:null,ERCKit:null,Warehouses:[], Errors:[{}]};
        // keressük az Omnisban
        //console.log("Before Omnis");
        try {
            const data = await this.omnisService.getProduct(productCode);
            if (data)
            {
                // volt találat, kitöltjük a fejléc adatokat
                const OMNISData = new Product();
                OMNISData.such = data["COD_ART"];
                OMNISData.namebspr = data["DES_ART"];
                OMNISData.le = data["UM_BASE"];
                ret.OMNISData = OMNISData;

                // gyártási lista lekérése
                const omnisPL = await this.omnisService.getProductListWithNewNames(productCode, productCode);
                if (omnisPL)
                {
                    // ha van adat mentjük
                    ret.OMNISData.table = omnisPL;
                    const i = 1;
                    // tételenként ellenőrizzük, létezik e az alapanyag az ERCben
                    for (const item of ret.OMNISData.table) {
                        // termék neve lehet nem jó formátum, vagy csere név kell...
                        //const newelex = await this.omnisService.productCodeChange(item.elex);
                        // 
                        //console.log("Omnis check:", item.elex, item.yberamid);
                        const criteria = "such=="+item.elex;
                        const li = await this.abasService.GetProducts(criteria, false);
                         
                        // ha van adat akkor megtalálta
                        if (li && li.length > 0)
                        {
                            item.checked = 2;
                            const lii = li[0];
                            item.yberamid = lii.yberamid;
                            item.elexid = lii.id;
                        } else {
                            item.checked = 1;
                        }
                    }
                }
            }
        } catch(e)
        {
            ret.Errors.push({
                error:e.error,
                message:"Omnis adatok lekérdezésekor keletkezett hiba"
            });
        }
        // console.log("Before ProductCodeChange");
        const prodAbas = await this.omnisService.productCodeChange(productCode);
        // keressük a beramban a kódot
        
        console.log("Before Beram");
        try {
            let criteria = "such=="+prodAbas+";yercid=="+prodAbas+";@Link=or";
            const beram = await this.abasService.GetProductsBeram(criteria, true);
            if (beram && beram.length > 0)
            {
                ret.BERAMData = beram[0];
                if (beram.length > 1)
                {
                    ret.Errors.push({
                        error: "BERAM Product code find error",
                        message: "A keresés a BERAM Abasban több találatot eredményezett. Az elsőt használja a rendszer!"
                    });
                }

            }
        } catch(e)
        {
            ret.Errors.push({
                error:e.error,
                message:"Beram adatok lekérdezésekor keletkezett hiba"
            });
        }
        
        // console.log("Before ERC");
        // keressük a ERCben a kódot
        try {
            let criteria = "such=="+prodAbas+";yberamid=="+prodAbas+";@Link=or";
            const erc = await this.abasService.GetProducts(criteria, true);
            if (erc && erc.length > 0)
            {
                ret.ERCData = erc[0];
                if (erc.length > 1)
                {
                    ret.Errors.push({
                        error: "ERC Product code find error",
                        message: "A keresés a ERC Abasban több találatot eredményezett. Az elsőt használja a rendszer!"
                    });
                }

                // ERC Kit keresés
                let criteria = "such=="+prodAbas+"KIT";
                const erckits = await this.abasService.GetProducts(criteria, true);
                if (erckits && erckits.length > 0)
                {
                    ret.ERCKit = erckits[0];
                }
            }
        } catch(e)
        {
            ret.Errors.push({
                error:e.error,
                message:"ERC adatok lekérdezésekor keletkezett hiba"
            });
        }

        // console.log("Before WGL");
        try{
            const wgl = await this.abasService.GetWarehouseGroups();
            if (wgl)
            {
                ret.Warehouses = wgl;
            } else {
                ret.Warehouses = [];
            }
        } catch(e)
        {
            ret.Errors.push({
                error:e.error,
                message:"ERC adatok lekérdezésekor keletkezett hiba"
            });
        }

        // console.log("Before RETURN");
        
        return ret;
    }

    lechange(le:string):string{
        let ret:string = le;
        ret = ret.includes('PZ') ? "Unit" : ret;
        ret = ret.includes('piece') ? "Unit" : ret;
        ret = ret.includes('MT') ? "m" : ret;
        return ret;
    }

    async createOrUpdateProduct(data:CreateOrUpdateProductModel){
        //console.log("Bejövő adat: ", JSON.stringify(data));
        // ERC id megadva, ellenőrizzül le
        let ercProduct:Product = null;
        let ercKit:Product = null;
        if (data.id)
        {
            ercProduct = await this.abasService.GetProduct(data.id, true);
            
            if (!ercProduct){
                console.log("hiba. Meg avn adva az erc kód még sincs meg az adat.");
                return;
            }
            //console.log("ERC cikk megtalálva");
        } else {
            // létrehozás
            //console.log("ERC cikk keresés...");
            const ercProducts = await this.abasService.GetProducts("such=="+data.product.such);
            if (ercProducts && ercProducts.length > 0) {
                ercProduct = ercProducts[0];
            } else {
                ercProduct = await this.abasService.CreateProduct({
                    head: {
                        fields: [
                            {
                                name :"such",
                                text : data.product.such
                            },
                            {
                                name :"name",
                                text : data.product.namebspr
                            },
                            {
                                name :"name8",
                                text : data.product.namebspr
                            },
                            {
                                name :"le",
                                text : this.lechange(data.product.le)
                            },
                            {
                                name :"bem",
                                text : data.product.bem
                            },
                            {
                                name :"bsart",
                                text : data.product.bsart ?? "(ExternalProcurement)"
                            },
                            {
                                name :"yelem1",
                                text : "KESZTERMEK"
                            },
                            {
                                name :"ystato",
                                text : "ATTIVO"
                            },
                            {
                                name :"vbez",
                                text : data.product.vkbez ?? ""
                            }
                        ]
                    }
                });
            }
        }

        if (!ercProduct) {
            console.log("hiba. Nem jött létre a termék");
            return;
        }

        // gyártási lista feltöltése
        for (const row of data.product.table)
        {
            console.log("ERC gyártási lista sor keresése", row.elex, row.checked, row.elexid);
            // termék keresése
            //const elexs = await this.abasService.GetProducts("such=="+row.elex+";yberamid=="+row.elex+";@Link=or");
            let elex:Product = null;
            if (row.checked !== 2)
            {
                // létre kell hozni a ciiket is
                //console.log("ERC gyártási lista cikk létrehozás");
                const bem = row.elname;
                if (row.elname.length > 60) {
                    row.elname = row.elname.substring(0, 59);
                }
                elex = await this.abasService.CreateProduct({
                    head: {
                        fields: [
                            {
                                name :"such",
                                text : row.elex
                            },
                            {
                                name :"name",
                                text : row.elname
                            },
                            {
                                name :"name8",
                                text : row.elname
                            },
                            {
                                name :"le",
                                text : row.melle
                            },
                            {
                                name :"yberamid",
                                text : row.yberamid
                            },
                            {
                                name :"bsart",
                                text : data.product.bsart == "" ? "(ExternalProcurement)" : data.product.bsart
                            },
                            {
                                name :"ystato",
                                text : "ATTIVO"
                            },
                            {
                                name :"bem",
                                text : bem
                            }
                        ]
                    }
                });
                row.elexid = elex.id;
            } else {
                console.log("ERC GYL cikk: ", elex.id, elex.such);
            }
        }

        // gyártási lista bővítése
        console.log("ERC gyártásilista írása");
        await this.abasService.UpdateProductProductionList(ercProduct.id, data.product.table);

        // volt kit?
        console.log("ERC kit keresés", data.kit.length, data.warehouseid)
        if (data.kit.length > 0 && data.warehouseid !== "") {
            console.log("ERC Kit keresés");
            const kits = await this.abasService.GetProducts("such=="+ercProduct.such+"KIT", true);
            
            if (kits && kits.length > 0)
            {
                ercKit = kits[0];
                console.log("ERC kit kód már van!");
            }
            else {
                console.log("ERC kit kód létrehozás");
                ercKit = await this.abasService.CreateProduct({
                    head: {
                        fields: [
                            {
                                name :"such",
                                text : ercProduct.such+"KIT"
                            },
                            {
                                name :"name",
                                text : ercProduct.namebspr + " KIT"
                            },
                            {
                                name :"name8",
                                text : ercProduct.namebspr + " KIT"
                            },
                            {
                                name :"le",
                                text : "Unit"
                            },
                            {
                                name :"bsart",
                                text : data.product.bsart == "" ? "(ExternalProcurement)" : data.product.bsart
                            },
                            {
                                name :"ystato",
                                text : "ATTIVO"
                            }
                        ]
                    }
                }, true);

            }

            console.log("ERC kit", JSON.stringify(ercKit));
            // raktarcsoport
            if (ercKit.wgp.length == 0)
            {
                //console.log("ERC kit raktárcsoport beállítása", ercKit.id, data.warehouseid);
                await this.abasService.CreateWarehouseGroup(ercKit.id, data.warehouseid, "(InhouseProduction)", "");
                //console.log("ERC kit with warehouse1");
                await this.abasService.UpdateProduct(ercKit.id, "umllg", data.warehouseid);
                //console.log("ERC kit with warehouse2");
                ercKit = await this.abasService.UpdateProduct(ercKit.id, "bsart", "(Relocation)", true);
                //console.log("ERC kit with warehouse3");
            }

            console.log("ERC kit with warehouse", JSON.stringify(ercKit));

            // gyártási lista feltöltése
            for (const row of data.kit)
            {
                row.melle = this.lechange(row.melle);
                console.log("ERC kit production list item: ", JSON.stringify(row));
                // termék keresése, itt nem hagyhatjuk el, mert ellenorizni kell a raktarcsoport beallitasokat
                const elexs = await this.abasService.GetProducts("such=="+row.elex+";yberamid=="+row.elex+";@Link=or", true);
                
                let elex:Product = null;
                if (row.checked !== 2)
                {
                    const bem = row.elname;
                    if (row.elname.length > 60) {
                        row.elname = row.elname.substring(0, 59);
                    }
                     
                    // létre kell hozni a ciiket is
                    elex = await this.abasService.CreateProduct({
                        head: {
                            fields: [
                                {
                                    name :"such",
                                    text : row.elex
                                },
                                {
                                    name :"name",
                                    text : row.elname
                                },
                                {
                                    name :"name8",
                                    text : row.elname
                                },
                                {
                                    name :"le",
                                    text : this.lechange(row.melle)
                                },
                                {
                                    name :"yberamid",
                                    text : row.yberamid
                                },
                                {
                                    name :"bsart",
                                    text : data.product.bsart == "" ? "(ExternalProcurement)" : data.product.bsart
                                },
                                {
                                    name :"ystato",
                                    text : "ATTIVO"
                                },
                                {
                                    name :"bem",
                                    text : bem
                                }
                            ]
                        }
                    }, true);
                } else {
                    elex = elexs[0];
                }
                
                // raktárcsoport ha nincs a cikknél, akkor létrehozzuk
                if (elex.wgp.length == 0 || elex.wgp.findIndex(c=>c.lgruppeid == data.warehouseid) == -1)
                {
                    console.log("--------------------------------------------------------");
                    console.log(JSON.stringify(elex));
                    await this.abasService.CreateWarehouseGroup(elex.id, data.warehouseid, "(ExternalProcurement)", "BERAM");
                }

                row.elexid = elex.id;
                
            }
            console.log("--------------------------------------------------------",JSON.stringify(ercKit));

            let pl:ProductList = null;
            console.log("ERC kit gyártási lista keresés",data.warehouseid);
            if (ercKit.wgp.length > 0 && ercKit.wgp.findIndex(c=>c.lgruppeid==data.warehouseid) > -1)
            {
                // KIt gyártási lista létrehozása, ha még nincs, vagy kiválasztj aaz utolsót
                console.log("Get product list...", ercKit.id, data.warehouseid);
                const pls = await this.abasService.GetProductList(ercKit.id, data.warehouseid);
                if (pls && pls.length > 0)
                {
                    // alapértelmezett
                    const pl = pls.find(c=>c.flistestd==="true");

                    // ha az nincs, legyen az első KIT nevű
                    if (!pl) {
                        const pl = pls.find(c=>c.such === "KIT");
                    }

                    // ha nincs az utoljára rögzített
                    if (!pl) {
                        const pl = pls[pls.length-1];
                    }
                } else {
                    // nincs, hozzuk létre
                    pl = await this.abasService.CreateProductList2("KIT", ercKit.id, data.warehouseid);
                }
            }

            if (pl)
            {
                // ez ide nem jóóóóóó direktbe kell a product listet írni
                console.log("Most frissitem a gyartasi listat");
                await this.abasService.UpdateProductionList(pl.id, data.kit, true);
                console.log("Készvan");
                //pl = await this.abasService.updateProductList2(pl.id, data.kit);
            }
            
            
            // nem mert a raktarcsoporton kell feltölteni
            //await this.abasService.UpdateProductProductionList(ercKit.id, data.kit);

        }

        // kit hozzáadás a gyártási listához, ha még nem volt benne
        console.log("Kit hozzáadása a gyártási listához");
        if (ercKit)
        {
            if (ercProduct.table.findIndex(c=>c.elexid == ercKit.id) == -1) {
                
                const npl = new ProductListItem();
                npl.elexid = ercKit.id;
                npl.elanzahl = "1";
                
                await this.abasService.UpdateProductProductionList(ercProduct.id, [npl]);
            }
        }

        // vevőkód rögzítése
        console.log("Vevőkód rögzítése", JSON.stringify(data.product.cpp), JSON.stringify(ercProduct.cpp));
        if (data.product.cpp.length > 0)
        {
            for (const cp of data.product.cpp)
            {
                // ha még nincs felvéve
                if (ercProduct.cpp.findIndex(c=>c.klnummer == cp.klnummer) == -1)
                {
                    console.log("Vevőkód felvétele", cp.klid, cp.klnummer, cp.prodnumber);
                    await this.abasService.CreateCustomerProductProperties(ercProduct.id, cp.klid, cp.prodnumber);
                } else {
                    // ha már van, akkor frissítsük
                    const ecp = ercProduct.cpp.find(c=>c.klnummer == cp.klnummer);
                    if (ecp.prodnumber != cp.prodnumber)
                    {
                        console.log("Vevőkód frissítése", ecp.klnummer, cp.prodnumber);
                        await this.abasService.UpdateCustomerProductProperties(ercProduct.id, ecp.klid, cp.prodnumber);
                    }
                }
            }
        }

        console.log("Kész");

        return;
    }
    
    onModuleDestroy() {
        throw new Error("Method not implemented.");
    }
    
}
