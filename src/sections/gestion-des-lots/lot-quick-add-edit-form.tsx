/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import * as Yup from 'yup';
import { useMemo } from 'react';
import { useSnackbar } from "notistack";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// MUI
import { LoadingButton } from "@mui/lab";
import { DatePicker } from '@mui/x-date-pickers';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

// Local Components
import FormProvider from "src/components/hook-form/form-provider";
import { RHFTextField } from 'src/components/hook-form';
import { RHFCheckbox } from 'src/components/hook-form/rhf-checkbox';
import { ILotItem } from 'src/types/lot';
import axios, { endpoints } from 'src/utils/axios';
import { useRouter } from 'src/routes/hooks';
import { parseISO } from 'date-fns';

/* -------------------------------------------------------------------------- */
/*                             LOT QUICK ADD FORM                             */
/* -------------------------------------------------------------------------- */
type Props = {
    currentLot?: ILotItem,
    defaultLot: ILotItem,
    setTableData: any,
    open: boolean,
    onClose: VoidFunction,
};

function LotQuickAddEditForm({ currentLot, defaultLot, setTableData, open, onClose }: Props) {
/* ---------------------------------- HOOKS --------------------------------- */ 
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();

    const NewLotSchema = Yup.object().shape({
        NUMLOT: Yup.number().required('Numéro de lot SINES est obligé'),
        NUMANME: Yup.number().required('Numéro de lot ANME est obligé'),
        LOTSTEG: Yup.boolean(),
        DATECREATION: Yup.mixed<any>().nullable().required("Date de Création est obligé"),
        //createur: Yup.string().required('Créateur est obligé'),
        DATEDEPOSITION: Yup.mixed<any>().nullable().required("Date de Création est obligé"),
        REJET: Yup.boolean()
    });

    const defaultValues = useMemo(
        () => ({ 
            NUMLOT: currentLot?.NUMLOT || 0,
            NUMANME: currentLot?.NUMANME || 0,
            LOTSTEG: currentLot?.LOTSTEG || false,
            DATECREATION: currentLot?.DATECREATION || new Date(),
            //createur: currentLot?.createur.username || '',
            DATEDEPOSITION: currentLot?.DATEDEPOSITION || null, 
            REJET: currentLot?.REJET || false
        }),
        [currentLot]
    );

    const methods = useForm({
        resolver: yupResolver(NewLotSchema),
        defaultValues,
    });

/* -------------------------------- CONSTANTS ------------------------------- */
    const {
        reset,
        control,
        handleSubmit,
        formState: { isSubmitting }
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        if (currentLot === defaultLot) {
            await axios.post(endpoints.lot.list, data)
            .then((response) => setTableData((prevStateArray: ILotItem[]) => [...prevStateArray, data]))
        } else {
            await axios.patch(`${endpoints.lot.edit}/${currentLot?.id}`, data)
            .then((response) => setTableData((prevStateArray: ILotItem[]) => [...prevStateArray, data]))
        }

        await new Promise((resolve) => setTimeout(resolve, 500));
        reset();
        enqueueSnackbar(currentLot !== defaultLot ? 'Modification avec succée!' : 'Création avec succée!');
        router.refresh();
        onClose();
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
                    {currentLot === defaultLot  ? 'Ajouter Un Lot' : 'Modifier Un Lot'}
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
                        <RHFTextField name="NUMLOT" label="Numéro De Lot SINES" />
                        <RHFTextField name="NUMANME" label="Numéro De Lot ANME" />
                        <RHFCheckbox name="LOTSTEG" label='Lot avec STEG' />
                        <Controller
                            name="DATECREATION"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                            <DatePicker
                                label="Date De Création"
                                value={typeof field.value === 'string' ? parseISO(field.value) : field.value}
                                onChange={(newValue) => {
                                    field.onChange(new Date(newValue));
                                }}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        error: !!error,
                                        helperText: error?.message,
                                    },
                                }}
                            />
                            )}
                        />

                        {/*<RHFSelect
                          fullWidth
                          name="createur"
                          label="Créateur"
                          InputLabelProps={{ shrink: true }}
                          PaperPropsSx={{ textTransform: 'capitalize' }}
                        >
                          {['Admin', 'Utilisateur'].map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </RHFSelect>*/}
                        
                        <Controller
                            name="DATEDEPOSITION"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <DatePicker
                                    label="Date De Déposition"
                                    value={typeof field.value === 'string' ? parseISO(field.value) : field.value}
                                    onChange={(newValue) => {
                                        field.onChange(new Date(newValue))
                                    }}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            error: !!error,
                                            helperText: error?.message,
                                        },
                                    }}
                                />
                            )}
                        />
                        <RHFCheckbox name="REJET" label='REJET' />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" onClick={onClose}>
                        Annuler
                    </Button>

                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                        {currentLot === defaultLot  ? 'Ajouter' : 'Modifier'}
                    </LoadingButton>
                </DialogActions>
            </FormProvider>
        </Dialog>
    )
};

export default LotQuickAddEditForm;