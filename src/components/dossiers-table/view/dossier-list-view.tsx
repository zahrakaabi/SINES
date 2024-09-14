'use client';

/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import isEqual from 'lodash/isEqual';
import { useState, useCallback } from 'react';

// MUI
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { IconButton, Stack, Tab, Tabs, Tooltip, alpha, useTheme } from '@mui/material';

// UI Local Components
import { useRouter } from 'src/routes/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
  TableSelectedAction,
  getComparator,
} from 'src/components/table';
import Iconify from '../../iconify';
import { IDossierItem, IDossierTableFilterValue, IDossierTableFilters } from 'src/types/dossier';
import DossierTableToolbar from '../dossier-table-toolbar';
import DossierTableRow from '../dossier-table-row';
import Label from 'src/components/label';
import DossierTableFiltersResult from '../dossier-table-filters-result';
import { isAfter, isBetween } from 'src/utils/format-time';
import axios, { endpoints } from 'src/utils/axios';
import { paths } from 'src/routes/paths';
import AffectDossierToLotForm from '../dossier-affect-to-lot-form';

/* -------------------------------------------------------------------------- */
/*                               DOSSIERS TABLE                               */
/* -------------------------------------------------------------------------- */
const defaultFilters: IDossierTableFilters = {
  name: '',
  //service: [],
  dateEmission: null,
  dateContrat: null,
  status: 'all',
};

function DossiersTable({tableData, setTableData}: any) {
/* ---------------------------------- HOOKS --------------------------------- */
  const { enqueueSnackbar } = useSnackbar();
  const table = useTable();
  const theme = useTheme();
  const router = useRouter();
  const confirm = useBoolean();
  const affectDossierToLot = useBoolean();
  const [filters, setFilters] = useState(defaultFilters);
  const dateError = isAfter(filters.dateEmission, filters.dateContrat);

/* -------------------------------- CONSTANTS ------------------------------- */
/* ---------------------------------- TABS ---------------------------------- */
  const TABS = [
    { value: 'all', label: 'Tout', color: 'default', count: tableData?.length },
    {
      value: 'ANME',
      label: 'ANME',
      color: 'success',
      count: 0,
    },
    {
      value: 'REJ ANME',
      label: 'REJ ANME',
      color: 'warning',
      count: 0,
    },
    {
      value: 'STEG',
      label: 'STEG',
      color: 'default',
      count: 0,
    },
    {
      value: 'REJ STEG',
      label: 'REJ STEG',
      color: 'warning',
      count: 0,
    },
    {
      value: 'DRAFT ANME',
      label: 'DRAFT ANME',
      color: 'error',
      count: 0,
    },
    {
      value: 'DRAFT STEG',
      label: 'DRAFT STEG',
      color: 'error',
      count: 0,
    }
  ] as const;

/* ---------------------------------- TABLE --------------------------------- */
  const TABLE_HEAD = [
    { id: 'nom-prenom', label: 'Nom & Prénom', minWidth: 200 },
    { id: 'numero-lot', label: 'Numéro De Lot', minWidth: 150 },
    { id: 'numero-dossier', label: 'Numéro Dossier', minWidth: 150 },
    { id: 'cin', label: 'CIN', width: 180 },
    { id: 'date-émission', label: "Date D'Emission", minWidth: 150 },
    { id: 'date-contrat', label: 'Date De Contrat', minWidth: 150 },
    { id: 'tel', label: 'Tel', width: 100 },
    { id: 'gouvernement', label: 'Gouvernement', width: 100 },
    { id: 'capteur-1', label: 'Capteur 1', width: 100 },
    { id: 'capteur-2', label: 'Capteur 2', minWidth: 120 },
    { id: 'ballon', label: 'Ballon', width: 100 },
    { id: 'adress-installation', label: 'Adress Installation', minWidth: 150 },
    { id: 'code-postal', label: 'Code Postal', minWidth: 150 },
    { id: 'ref-steg', label: 'Réf STEG', width: 100 },
    { id: 'action', label: 'Action', width: 100 }
  ];

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
    dateError,
  });

  const dataInPage = dataFiltered?.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 56 : 56 + 20;
  const canReset = !isEqual(defaultFilters, filters);
  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

/* ----------------------------- HANDLE FILTERS ----------------------------- */
  const handleFilters = useCallback(
    (name: any, value: IDossierTableFilterValue) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

/* -------------------------- HANDLE FILTERS STATUS ------------------------- */
  const handleFilterStatus = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

/* -------------------------- HANDLE RESET FILTERS -------------------------- */
  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

/* ----------------------------- HANDLE VIEW ROW ---------------------------- */
  const handleViewRow = useCallback(
    (id: number) => {
      router.push(paths.dashboard.details(id));
    },
    [router]
  );

/* ---------------------------- HANDLE DELETE ROW --------------------------- */
  const deleteDossier = async (id: number) => await axios.delete(`${endpoints.dossier.list}/${id}`);
  const handleDeleteRow = useCallback(
    async (id: number) => {
      deleteDossier(id);
      const newTableData = tableData.filter((row: { id: number; }) => row.id !== id);
      setTableData(newTableData);
      enqueueSnackbar('Suppression avec succée!');
      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, enqueueSnackbar, table, tableData]
  );

/* --------------------------- HANDLE DELETE ROWS --------------------------- */
  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData?.filter((row: { id: number; }) => !table.selected.includes(row.id));
    enqueueSnackbar('Suppression avec succée!');
    setTableData(deleteRows);
    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, enqueueSnackbar, table, tableData]);

/* ----------------------------- HANDLE EDIT ROW ---------------------------- */
  const handleEditRow = useCallback(
    (id: number) => {
      router.push(paths.dashboard.lot.editFile(id));
    },
    [router]
  );

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <>
      <Card>
        <Tabs
          value={filters.status}
          onChange={handleFilterStatus}
          sx={{
            px: 2.5,
            boxShadow: `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        >
          {TABS?.map((tab: any) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                iconPosition="end"
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === filters.status) && 'filled') || 'soft'
                    }
                    color={tab?.color}
                  >
                    {tab.count}
                  </Label>
                }
              />
            ))
          }
        </Tabs>

        <DossierTableToolbar
          filters={filters}
          onFilters={handleFilters}
          dateError={dateError}
          //serviceOptions={DOSSIER_SERVICE_OPTIONS.map((option) => option.name)}
        />

        {canReset && (
          <DossierTableFiltersResult
            filters={filters}
            onFilters={handleFilters}
            onResetFilters={handleResetFilters}
            results={dataFiltered.length}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={dataFiltered.length}
            onSelectAllRows={(checked) => {
              table.onSelectAllRows(
                checked,
                dataFiltered.map((row) => row.id)
              );
            }}
            action={
              <Stack direction="row">
                <Tooltip title="Affecter à un lot">
                  <IconButton color="primary" onClick={affectDossierToLot.onTrue}>
                    <Iconify icon="iconamoon:send-fill" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Télècharger">
                  <IconButton color="primary">
                    <Iconify icon="eva:download-outline" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Imprimer">
                  <IconButton color="primary">
                    <Iconify icon="solar:printer-minimalistic-bold" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Supprimer">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              </Stack>
            }
          />

          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={dataFiltered.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    dataFiltered.map((row) => row.id)
                  )
                }
              />

              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <DossierTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onViewRow={() => handleViewRow(row.id)}
                      onEditRow={() => handleEditRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                />

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={dataFiltered.length}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
          dense={table.dense}
          onChangeDense={table.onChangeDense}
        />
      </Card>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Supprimer"
        content={
          <>
            Vous etes sure de supprimer <strong> {table.selected.length} Lots </strong>?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Supprimer
          </Button>
        }
      />

      <AffectDossierToLotForm
        setTableData={setTableData}
        selectedDossiersIds={table.selected}
        open={affectDossierToLot.value} 
        onClose={affectDossierToLot.onFalse} 
      />
    </>
  );
};

export default DossiersTable;

/* -------------------------------------------------------------------------- */
/*                                APPLY FILTER                                */
/* -------------------------------------------------------------------------- */
function applyFilter({
  inputData,
  comparator,
  filters,
  dateError,
}: {
  inputData: IDossierItem[];
  filters: IDossierTableFilters;
  comparator: (a: any, b: any) => number;
  dateError: boolean;
}) {
/* -------------------------------- CONSTANTS ------------------------------- */
  const { name } = filters;

  if (name) {
    inputData = inputData?.filter(
      (dossier) => dossier.NOM.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
      dossier.PRENOM.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
      dossier.PRENOM.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
      (dossier.lot && dossier.lot.NUMLOT.toString().includes(name.toString())) ||
      dossier.CIN.toString().includes(name.toString()) ||
      dossier.id.toString().includes(name.toString()) ||
      dossier.TEL.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
      dossier.VILLE.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
      dossier.NUMSERIECAPTEUR1.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
      dossier.NUMSERIECAPTEUR2.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
      dossier.BALLON.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
      dossier.ADRINSTALLATION.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
      dossier.POSTALCODE.toString().includes(name.toString())
    );
  };
  
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  /*if (service.length) {
    inputData = inputData.filter((dossier) =>
      dossier.items.some((filterItem) => service.includes(filterItem.service))
    );
  };*/

  /*if (!dateError) {
    if (dateEmission && dateContrat) {
      inputData = inputData.filter((dossier) => isBetween(dossier.DATEEMISSION, dateEmission, dateContrat));
    }
  }*/

/* -------------------------------- RENDERING ------------------------------- */
  return inputData;
};