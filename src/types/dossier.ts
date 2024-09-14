/* -------------------------------------------------------------------------- */
/*                          I DOSSIER TABLE FILTERS                           */
/* -------------------------------------------------------------------------- */
export type IDossierTableFilters = {
    name: any,
    //service: string[],
    dateEmission: Date | null,
    dateContrat: Date | null, 
    status: string;
};

/* -------------------------------------------------------------------------- */
/*                       I DOSSIER TABLE FILTERS VALUE                        */
/* -------------------------------------------------------------------------- */
export type IDossierTableFilterValue = string | string[] | any | Date | null;

/* -------------------------------------------------------------------------- */
/*                                  LOT ITEM                                  */
/* -------------------------------------------------------------------------- */
export type IDossierItem = {
    id: number,
    // fiche client
    POSTALCODE: number,
    //@TO DO: add Gouvernement (select)
    DISTRICT: string,
    ADRINSTALLATION: string,
    VILLE: string,
    CIN: number,
    NOM: string,
    PRENOM: string,
    TEL: string,
    DATEEMISSION: Date,
    DATECONTRAT: Date,
    ENTRETIENTMANUEL: boolean,
    FACTUREDETAILLE: boolean,
    CONTRATGARANTIE: boolean,

    // mode actuel
    MchGPL: boolean,
    MchElectrique: boolean,
    MchGazNaturel: boolean,
    MchAutre: boolean,

    INSTALLATEUR: string, //@TO DO: string[]
    
    MARQUE: string, //@TO DO: string[]
    NUMADMISSION: number,
    CAPACITE: string,
    SURFACE: string,
    
    NUMSERIECAPTEUR1: string, // @TO DO: string[]
    NUMSERIECAPTEUR2: string, // @TO DO: string[]
    BALLON: string, // @TO Do: string[]

    // tableau financier
    PRIXTTC: number,
    subvention: number,
    AUTOFINANCE: number,

    // pieces jointes
    fichersJoint: [];

    lot_id: number,
    lot: {
        id: number,
        NUMLOT: number
    },
    createur: {
        id: number,
        username: string
    },
    createdAt: Date
};