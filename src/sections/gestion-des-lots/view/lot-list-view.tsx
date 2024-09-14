'use client';

/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import isEqual from 'lodash/isEqual';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';

// MUI
import { Button, Card, Container, Divider, IconButton, Stack, Tab, Table, TableBody, TableContainer, Tabs, Tooltip, alpha, useTheme } from '@mui/material';

// UI Local Components
import { useSettingsContext } from 'src/components/settings';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { ILotItem, ILotTableFilterValue, ILotTableFilters } from 'src/types/lot';
import axios, { endpoints } from 'src/utils/axios';
import { TableEmptyRows, TableHeadCustom, TableNoData, TablePaginationCustom, TableSelectedAction, emptyRows, useTable } from 'src/components/table';
import Scrollbar from 'src/components/scrollbar';
import LotTableRow from '../lot-table-row';
import LotQuickAddEditForm from '../lot-quick-add-edit-form';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Label from 'src/components/label';
import LotTableToolbar from 'src/sections/gestion-des-lots/lot-table-toolbar';
import LotTableFiltersResult from '../lot-table-filters-result';
import LotTitles from '../lot-titles';
import { isAfter, isBetween } from 'src/utils/format-time';

/* -------------------------------------------------------------------------- */
/*                          GESTION DES LOTS SECTION                          */
/* -------------------------------------------------------------------------- */
const defaultFilters: ILotTableFilters = {
  createur: '',
  status: 'all',
  DATECREATION: null,
  DATEDEPOSITION: null,
};

const defaultLot: ILotItem = {
  id: 0,
  NUMLOT: 0,
  NUMANME: 0,
  LOTSTEG: false,
  DATECREATION: null,
  createur: {
    id: 0,
    username: ''
  },
  DATEDEPOSITION: null,
  REJET: false
};

/* -------------------------------------------------------------------------- */
/*                         GESTION DES LOTS COMPONENT                         */
/* -------------------------------------------------------------------------- */
function GestionDesLots() {
/* ------------------------------ CUSTOM HOOKS ------------------------------ */
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const settings = useSettingsContext();
  const theme = useTheme();
  const quickAddLot = useBoolean();
  const table = useTable();
  const [tableData, setTableData] = useState<ILotItem[]>([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [lot, setLot] = useState(defaultLot);
  const [deleteSelected, setDeleteSelected] = useState(false);

  const dateError = isAfter(filters.DATECREATION, filters.DATEDEPOSITION);

/* ------------------------------ GET LOTS LIST ----------------------------- */
  const _lots = async () => {
    await axios.get(endpoints.lot.list)
    .then(({data: response}) => setTableData(response))
  };

  useEffect(() => {
    _lots();
  }, []);

/* ------------------------------- TABS VALUES ------------------------------ */
  const TABS = [
    { value: 'all', label: 'Tout', color: 'default', count: tableData?.length },
    {
      value: 'STEG',
      label: 'STEG',
      color: 'success',
      count: tableData.filter((item) => item.LOTSTEG).length
    },
    {
      value: 'ANME',
      label: 'ANME',
      color: 'warning',
      count: 0 //getLotLength('ANME')
    },
    {
      value: 'En cours',
      label: 'En cours',
      color: 'default',
      count: 0 //getLotLength('En cours')
    },
    {
      value: 'Rejet',
      label: 'Rejet',
      color: 'error',
      count: tableData.filter((item) => item.REJET).length
    },
  ] as const;
  
/* ----------------------------- HANDLE FILTERS ----------------------------- */
  const handleFilters = useCallback(
    (createur: string, value: ILotTableFilterValue) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [createur]: value,
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

/* ------------------------------- TABLE HEAD ------------------------------- */
  const TABLE_HEAD = [
    { id: 'numéro-lot-SINES', label: 'Numéro de Lot SINES', minWidth: 200 },
    { id: 'numéro-lot-ANME', label: 'Numéro de Lot ANME', minWidth: 200 },
    { id: 'lot-avec-STEG', label: 'Lot Avec STEG', minWidth: 200 },
    { id: 'date-création', label: 'Date de Création', width: 200 },
    { id: 'créateur', label: 'Créateur', width: 100 },
    { id: 'date-déposition', label: 'Date de Déposition', width: 200 },
    { id: 'rejet', label: 'Rejet', width: 100 },
    { id: '' },
  ];

/* ---------------------------------- TABLE --------------------------------- */
  const dataFiltered = applyFilter({
    inputData: tableData ? tableData : [],
    filters,
    dateError
  });

  const dataInPage = dataFiltered?.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 56 : 56 + 20;
  const canReset = !isEqual(defaultFilters, filters);
  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

/* ---------------------------- HANDLE DELETE ROW --------------------------- */
  const deleteLot = async (id: number) => await axios.delete(`${endpoints.lot.list}/${id}`);
  const handleDeleteRow = useCallback(
    async (id: number) => {
      deleteLot(id);
      const newTableData = tableData.filter((row: { id: number; }) => row.id !== id);
      setTableData(newTableData);
      enqueueSnackbar('Suppression avec succée!');
      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, enqueueSnackbar, table, tableData]
  );
  
/* ----------------------------- HANDLE EDIT ROW ---------------------------- */
  const handleEditRow = useCallback(
    (row: ILotItem) => {
      router.push(paths.dashboard.lot.edit(row.id));
      setLot(row);
    },
    [router]
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

/* -------------------------------- RENDERING ------------------------------- */
  return (
   <>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        {/* ------------------------------- BREADCRUMBS ------------------------------ */}
        <CustomBreadcrumbs
          heading='Gestion Des Lots'
          links={[
            { name: 'Acceuil', href: paths.dashboard.root },
            { name: 'Gestion Des Lots', href: paths.dashboard.gestionsDesLots }
          ]}
          action={
            <Button 
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={quickAddLot.onTrue}
            >
              Ajouter Lot
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        {/* ----------------------------- END BREADCRUMBS ---------------------------- */}

        {/* -------------------------------- OVERVIEW -------------------------------- */}
        <Card
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        >
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <LotTitles
                icon="solar:bill-list-bold-duotone"
                percent={100}
                color={theme.palette.info.main}
                title="Tout"
                total={tableData.length}
              />
              
              <LotTitles
                icon="icomoon-free:profile"
                percent={(tableData.filter((item) => item.LOTSTEG).length / tableData.length * 100)}
                color={theme.palette.success.main}
                title="STEG"
                total={tableData.filter((item) => item.LOTSTEG).length}
              />

              <LotTitles
                icon="mdi:payment-settings"
                percent={0} //{getPercentByStatus('ANME')}
                color={theme.palette.warning.main}
                title="ANME"
                total={0} //{getLotLength('ANME')}
              />

              <LotTitles
                icon="solar:delivery-line-duotone"
                percent={0} //{getPercentByStatus('En cours')}
                color={theme.palette.text.secondary}
                title="En cours"
                total={0} //{getLotLength('En cours')}
              />

              <LotTitles
                icon="mdi:file-document-plus-outline"
                percent={(tableData.filter((item) => item.REJET).length / tableData.length) * 100}
                color={theme.palette.error.main}
                title="Rejet"
                total={tableData.filter((item) => item.REJET).length}
              />
            </Stack>
          </Scrollbar>
        </Card>
        {/* ------------------------------ END OVERVIEW ------------------------------ */}
         
        <Card>
        {/* ---------------------------------- TABS ---------------------------------- */}
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
              ))}
          </Tabs>
          {/* -------------------------------- END TABS -------------------------------- */}

          {/* ------------------- TABLE TOOLBAR & TABLE FILTER RESULT ------------------ */}
          <LotTableToolbar
            filters={filters}
            onFilters={handleFilters}
            dateError={dateError}
          />

          {canReset && (
            <LotTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              onResetFilters={handleResetFilters}
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}
          {/* ----------------- END TABLE TOOLBAR & TABLE FILTER RESULT ---------------- */}

          {/* -------------------------------- LOT TABLE ------------------------------- */}
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={dataFiltered.length}
              onSelectAllRows={(checked) => {
                table.onSelectAllRows(
                  checked,
                  dataFiltered?.map((row) => row.id)
                );
              }}
              action={
                <Stack direction="row">
                  <Tooltip title="Envoyer">
                    <IconButton color="primary">
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
                    <IconButton color="primary" onClick={() => {
                      quickAddLot.onTrue();
                      setDeleteSelected(true);
                    }}>
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
                  onSelectAllRows={(checked: boolean) =>
                    table.onSelectAllRows(
                      checked,
                      dataFiltered.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    ?.slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    ?.map((row) => (
                      <LotTableRow
                        key={row?.id}
                        defaultLot={defaultLot}
                        row={row}
                        setTableData={setTableData}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row)}
                      />
                    ))
                  }

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
        </Card>

        <TablePaginationCustom
          count={dataFiltered.length}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
          dense={table.dense}
          onChangeDense={table.onChangeDense}
        />
        
        {deleteSelected && <ConfirmDialog
          open={quickAddLot.value}
          onClose={quickAddLot.onFalse}
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
                quickAddLot.onFalse();
              }}
            >
              Supprimer
            </Button>
          }
        />}
        
        {!deleteSelected && <LotQuickAddEditForm 
          currentLot={lot}
          defaultLot={defaultLot} 
          setTableData={setTableData}
          open={quickAddLot.value} 
          onClose={quickAddLot.onFalse} 
        />}

        {/* ------------------------------ END LOT TABLE ----------------------------- */}

      </Container>
    </>
  );
};

export default GestionDesLots;

/* -------------------------------------------------------------------------- */
/*                                APPLY FILTER                                */
/* -------------------------------------------------------------------------- */
function applyFilter({
  inputData,
  filters,
  dateError,
}: {
  inputData: ILotItem[];
  filters: ILotTableFilters;
  dateError: boolean;
}) {
/* -------------------------------- CONSTANTS ------------------------------- */
  const { createur, DATECREATION, DATEDEPOSITION  } = filters;

  if (createur) {
    inputData = inputData?.filter((lot) => lot.createur.username.toLowerCase().indexOf(createur.toLowerCase()) !== -1 );
  }

  if (!dateError) {
    if (DATECREATION && DATEDEPOSITION) {
      inputData = inputData.filter((lot) => isBetween(lot.DATECREATION, DATECREATION, DATEDEPOSITION));
    }
  }

/* -------------------------------- RENDERING ------------------------------- */
  return inputData;
};