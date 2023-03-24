export class Product {
    id!:string;
    nummer!:string;
    such!:string;
    namebspr!:string;
    le!: string;
    vkbez!:string;
    yberamid!:string;
    yelem1!:string;
    ystato!:string;
    bem!:string;
    bestand!:number;
    bsart!:string;
    gtin!:string;
    lgruppe:string="ERC";
    table:ProductListItem[]=[];
    cpp:CustomerProductProperty[]=[];
    wgp:WarehouseGroupProperty[]=[];
}

export class ProductList {
    id!:string;
    nummer!:string;
    such!:string;
    flistestd!:string;
    artikelid!:string;
    artikel!:string;
    lgruppe!:string;
    table:ProductListItem[]=[];
}

export class ProductListItem {
    rowid!:string;
    elexid!:string;
    elex!:string;
    elname!:string;
    yeelem1!:string;
    elanzahl!:string;
    melle!:string;
    bua!:string;
    yberamid!:string;
    checked:number=0;
    duplicate:boolean=false;
}

export class CustomerProductProperty {
    id!:string;
    klid!:string;
    klnummer!:string
    klsuch!:string;
    prodnumber!:string;
}

export class WarehouseGroupProperty {
    lgruppe:string;
    lgruppeid:string;
    zuplatz:string;
    abplatz:string;
    dispoa:string;
    bsart:string;
    flistestdid:string;
    lief:string;
    liefid:string;
    eprg:string;
}