export interface Product{
    id : string;
    label : string;
    price : number;
    isPromotion : boolean;
}

export interface PageProduct{
 products : Product[];
 pageIndex : number;
 pageSize : number;
 totalPages : number;
}