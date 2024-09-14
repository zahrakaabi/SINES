/* -------------------------------------------------------------------------- */
/*                                 TABLE PROPS                                */
/* -------------------------------------------------------------------------- */
export type TableProps = {
  dense: boolean;
  page: number;
  rowsPerPage: number;
  order: 'asc' | 'desc';
  orderBy: number;
  //
  selected: number[];
  onSelectRow: (id: number) => void;
  onSelectAllRows: (checked: boolean, newSelecteds: number[]) => void;
  //
  onResetPage: VoidFunction;
  onSort: (id: number) => void;
  onChangePage: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDense: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdatePageDeleteRow: (totalRowsInPage: number) => void;
  onUpdatePageDeleteRows: ({
    totalRowsInPage,
    totalRowsFiltered,
  }: {
    totalRowsInPage: number;
    totalRowsFiltered: number;
  }) => void;
  //
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setDense: React.Dispatch<React.SetStateAction<boolean>>;
  setOrder: React.Dispatch<React.SetStateAction<'desc' | 'asc'>>;
  setOrderBy: React.Dispatch<React.SetStateAction<number>>;
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
};