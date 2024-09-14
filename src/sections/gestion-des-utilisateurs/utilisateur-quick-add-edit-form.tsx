/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import * as Yup from 'yup';
import { useMemo } from 'react';
import { useSnackbar } from "notistack";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// MUI
import { LoadingButton } from "@mui/lab";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, MenuItem } from "@mui/material";

// Local Components
import FormProvider from "src/components/hook-form/form-provider";
import { RHFTextField } from 'src/components/hook-form';
import { RHFSelect } from 'src/components/hook-form/rhf-select';
import { IUserItem } from 'src/types/user';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { useRouter } from 'src/routes/hooks';
import axios, { endpoints } from 'src/utils/axios';

/* -------------------------------------------------------------------------- */
/*                            USER QUICK ADD FORM                             */
/* -------------------------------------------------------------------------- */
type Props = {
    tableData: IUserItem[],
    setTableData: any,
    currentUser?: IUserItem,
    defaultUser: IUserItem,
    open: boolean,
    onClose: VoidFunction
};

function UserQuickAddEditForm({ tableData, setTableData, currentUser, defaultUser, open, onClose }: Props) {
/* ---------------------------------- HOOKS --------------------------------- */
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const password = useBoolean();

    const NewLotSchema = Yup.object().shape({
        username: Yup.string().required('Username est obligé'),
        nom: Yup.string().required('Nom est obligé'),
        prenom: Yup.string().required('Prénom est obligé'),
        password: Yup.string().required('Mot de passe est obligé'),
        role: Yup.string().required('Code Utilisateur est obligé')
    });

    const defaultValues = useMemo(
        () => ({ 
            username: currentUser?.username || '',
            nom: currentUser?.nom || '',
            prenom: currentUser?.prenom || '',
            password: currentUser?.password ||'',
            role: currentUser?.role || 'ROLE_ADMIN'
        }),
        [currentUser]
    );

    const methods = useForm({
        resolver: yupResolver(NewLotSchema),
        defaultValues,
    });

/* -------------------------------- CONSTANTS ------------------------------- */
    const {
        control,
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        if (currentUser === defaultUser) {
            const res = await axios.post(endpoints.user.list , data)
            .then((response) => setTableData((prevStateArray: IUserItem[]) => [...prevStateArray, data]))
        } else {
            await axios.patch(`${endpoints.user.edit}/${currentUser?.id}`, data)
            .then((response) => setTableData(tableData.map((user: IUserItem) =>
                user.id === currentUser?.id ? data : user
            )))
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
        reset();
        router.refresh();
        onClose();
        enqueueSnackbar(currentUser !== defaultUser ? 'Modification avec succée!' : 'Création avec succée!');
    });

/* -------------------------------- RENDERING ------------------------------- */
    return (
        <Dialog
            fullWidth
            maxWidth={false}
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: { maxWidth: 720 },
            }}
        >
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <DialogTitle>
                    {currentUser === defaultUser  ? 'Ajouter Utilisateur' : 'Modifier Utilisateur'}
                </DialogTitle>

                <DialogContent>
                    <Box
                        rowGap={3}
                        columnGap={2}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)'
                        }}
                        sx={{ pt: 1 }}
                    >
                        <RHFTextField name="nom" label="Nom" />
                        <RHFTextField name="prenom" label="Prènom" />
                        <RHFTextField name="username" label="Username" />
                        <RHFTextField
                            name="password"
                            label="Mot De Passe"
                            type={password.value ? 'text' : 'password'}
                            InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={password.onToggle} edge="end">
                                        <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            }}
                        />
                        <RHFSelect
                          fullWidth
                          name="role"
                          label="Role"
                          InputLabelProps={{ shrink: true }}
                          PaperPropsSx={{ textTransform: 'capitalize' }}
                        >
                          {['ROLE_ADMIN', 'ROLE_USER'].map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </RHFSelect>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" onClick={onClose}>
                        Annuler
                    </Button>

                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                        {currentUser === defaultUser  ? 'Ajouter' : 'Modifier'}
                    </LoadingButton>
                </DialogActions>
            </FormProvider>
        </Dialog>
    )
};

export default UserQuickAddEditForm;