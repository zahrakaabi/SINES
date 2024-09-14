/* -------------------------------------------------------------------------- */
/*                             I LOT TABLE FILTERS                            */
/* -------------------------------------------------------------------------- */
export type ILotTableFilters = {
    créateur: string;
    status: string;
    creationDate: Date | null;
    depositionDate: Date | null;
};

/* -------------------------------------------------------------------------- */
/*                          I LOT TABLE FILTERS VALUE                         */
/* -------------------------------------------------------------------------- */
export type ILotTableFilterValue = string | string[] | number | Date | null;

/* -------------------------------------------------------------------------- */
/*                                  LOT ITEM                                  */
/* -------------------------------------------------------------------------- */
export type ILotItem = {
    id: number,
    NUMLOT: number,
    NUMANME: number,
    LOTSTEG: boolean, 
    DATECREATION: Date | null,
    createur: {
        id: number,
        username: string
    },
    DATEDEPOSITION: Date | null,
    REJET: boolean
};