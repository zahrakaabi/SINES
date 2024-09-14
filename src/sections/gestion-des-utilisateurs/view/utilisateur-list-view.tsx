'use client';

/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import isEqual from 'lodash/isEqual';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';

// MUI
import { Button, Card, Container, IconButton, Stack, Table, TableBody, TableContainer, Tooltip, useTheme } from '@mui/material';

// UI Local Components
import { useSettingsContext } from 'src/components/settings';
import { paths } from 'src/routes/paths';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useRouter } from 'src/routes/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import { TableEmptyRows, TableHeadCustom, TableNoData, TablePaginationCustom, TableSelectedAction, emptyRows, useTable } from 'src/components/table';
import { IUserItem, IUserTableFilterValue, IUserTableFilters } from 'src/types/user';
import axios, { endpoints } from 'src/utils/axios';
import UserTableToolbar from '../utilisateur-table-toolbar';
import UserTableFiltersResult from '../utilisateur-table-filters-result';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import UserTableRow from '../utilisateur-table-row';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { _firstName, _role, _selectRole, _users } from 'src/_mock';
import UserQuickAddEditForm from '../utilisateur-quick-add-edit-form';

/* -------------------------------------------------------------------------- */
/*                       GESTION DES DOSSIERS COMPONENT                       */
/* -------------------------------------------------------------------------- */
const defaultFilters: IUserTableFilters = {
  name: '',
  role: [],
  status: 'all',
};

const defaultUser: IUserItem = {
  id: 0,
  username: '',
  nom: '',
  prenom: '',
  password: '',
  role: ''
};

function GestionDesUtilisateurs() {
/* ------------------------------ CUSTOM HOOKS ------------------------------ */
  const settings = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const quickAddUser = useBoolean();
  const theme = useTheme();
  const quickAddLot = useBoolean();
  const table = useTable();
  const [tableData, setTableData] = useState<IUserItem[]>([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [user, setUser] = useState(defaultUser);
  const [deleteSelected, setDeleteSelected] = useState(false);

/* ---------------------------------- USERS --------------------------------- */
  const fetchUsers = async () => {
    try {
      await axios.get(endpoints.user.list)
      .then(({data: response}) => setTableData(response))
    } catch (error) {
      console.log("Error loading users: ", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

/* ----------------------------- HANDLE FILTERS ----------------------------- */
  const handleFilters = useCallback(
    (créateur: string, value: IUserTableFilterValue) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [créateur]: value,
      }));
    },
  [table]
  );
  
/* -------------------------- HANDLE RESET FILTERS -------------------------- */
  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

/* -------------------------------- CONSTANTS ------------------------------- */
/* ---------------------------------- TABLE --------------------------------- */
  const dataFiltered = applyFilter({
    inputData: tableData ? tableData : [],
    filters
  });

  const dataInPage = dataFiltered?.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 56 : 56 + 20;
  const canReset = !isEqual(defaultFilters, filters);
  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

/* ------------------------------- TABLE HEAD ------------------------------- */
  const TABLE_HEAD = [
    { id: 'nom-prénom', label: 'Nom & Prénom', width: 300 },
    { id: 'code-utilisateur', label: 'Code Utilisateur', width: 300 },
    { id: 'role', label: 'Role', width: 180 },
    { id: '' },
  ];

/* ---------------------------- HANDLE DELETE ROW --------------------------- */
  const deleteUser = async (id: number) => await axios.delete(`${endpoints.user.list}/${id}`);
  const handleDeleteRow = useCallback(
    (id: number) => {
      const deleteRow = tableData.filter((row: { id: number; }) => row.id !== id);
      enqueueSnackbar('Suppression avec succée!');
      deleteUser(id);
      setTableData(deleteRow);
      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, enqueueSnackbar, table, tableData]
  );
  
/* ----------------------------- HANDLE EDIT ROW ---------------------------- */
  const handleEditRow = useCallback(
    (row: IUserItem) => {
      //router.push(paths.dashboard.lot.edit(row.id));
      setUser(row);
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
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      {/* ------------------------ START CUSTOM BREADCRUMBS ------------------------ */}
      <CustomBreadcrumbs
        heading='Gestion Des Utilisateurs'
        links={[
          { name: 'Acceuil', href: paths.dashboard.root },
          { name: 'Gestion Des Utilisateurs', href: paths.dashboard.gestionsDesUtlisateurs }
        ]}
        action={
          <Button 
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={quickAddUser.onTrue}
          >
            Ajouter Utilisateur
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      {/* -------------------------- END CUSTOM BREADRUMBS ------------------------- */}

      {/* ---------------------------- START USERS LIST ---------------------------- */}
      <Card>
        {/* ------------------- TABLE TOOLBAR & TABLE FILTER RESULT ------------------ */}
        <UserTableToolbar
          filters={filters}
          onFilters={handleFilters}
          roleOptions={_selectRole}
        />

        {canReset && (
          <UserTableFiltersResult
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
                dataFiltered.map((row) => row.id)
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
                  <IconButton 
                    color="primary" 
                    onClick={() => {
                      quickAddLot.onTrue();
                      setDeleteSelected(true);
                    }}
                  >
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
                    <UserTableRow
                      key={row.id}
                      row={row}
                      tableData={tableData}
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
      
      {deleteSelected &&<ConfirmDialog
        open={quickAddLot.value}
        onClose={quickAddLot.onFalse}
        title="Supprimer"
        content={
          <>
            Vous etes sure de supprimer <strong> {table.selected.length} Utilisateurs </strong>?
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

      {!deleteSelected && <UserQuickAddEditForm 
        tableData={tableData}
        setTableData={setTableData}
        currentUser={user}
        defaultUser={defaultUser} 
        open={quickAddUser.value} 
        onClose={quickAddUser.onFalse} 
      />}
      {/* ----------------------------- END USERS LIST ----------------------------- */}
    </Container>
  );
};

export default GestionDesUtilisateurs;

/* -------------------------------------------------------------------------- */
/*                                APPLY FILTER                                */
/* -------------------------------------------------------------------------- */
function applyFilter({
  inputData,
  filters
}: {
  inputData: IUserItem[];
  filters: IUserTableFilters
}) {
/* -------------------------------- CONSTANTS ------------------------------- */
  const { name, role } = filters;

  /*if (status !== 'all') {
    inputData = inputData?.filter((user) => user.status === status);
  }*/

  if (name) {
    inputData = inputData?.filter(
      (user) => user.nom.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
      user.prenom.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (role.length) {
    inputData = inputData.filter(() => role.includes('Admin'));
  }

/* -------------------------------- RENDERING ------------------------------- */
  return inputData;
};