/* -------------------------------------------------------------------------- */
/*                             USER TABLE FILTERS                             */
/* -------------------------------------------------------------------------- */
export type IUserTableFilters = {
    name: string,
    role: string[],
    status: string
};

/* -------------------------------------------------------------------------- */
/*                           USER TABLE FILTERS VALUE                         */
/* -------------------------------------------------------------------------- */
export type IUserTableFilterValue = string | string[];

/* -------------------------------------------------------------------------- */
/*                                  USER ITEM                                 */
/* -------------------------------------------------------------------------- */
export type IUserItem = {
    id: number,
    username: string,
    nom: string,
    prenom: string,
    password: string,
    role: string
};