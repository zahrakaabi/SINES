/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useEffect, useState } from 'react';

// MUI
import { LoadingButton } from "@mui/lab";
import { 
    FormControl, 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    Autocomplete, 
    TextField
} from "@mui/material";

// Local Components
import { ILotItem } from 'src/types/lot';
import axios, { endpoints } from 'src/utils/axios';
import { IDossierItem } from 'src/types/dossier';

/* -------------------------------------------------------------------------- */
/*                             LOT QUICK ADD FORM                             */
/* -------------------------------------------------------------------------- */
type Props = {
    setTableData: (newTableData: IDossierItem[]) => void,
    selectedDossiersIds: number[],
    open: boolean,
    onClose: VoidFunction,
};

function AffectDossierToLotForm({ setTableData, selectedDossiersIds, open, onClose }: Props) {
/* ---------------------------------- HOOKS --------------------------------- */ 
  const [lots, setLots] = useState<ILotItem[]>([]);  
  const [selectedNUMLOT, setSelectedNUMLOT] = useState<number>(0);

  const fetchLots = async () => {
    const { data: lotsResponse } = await axios.get(endpoints.lot.list);
    setLots(lotsResponse);
  };
  
  const fetchUpdatedDossiers = async () => {
    const { data: dossiersResponse } = await axios.get(endpoints.dossier.list);
    setTableData(dossiersResponse);
  };

  useEffect(() => {
    if (open) {
        fetchLots();
    }
  }, [open]);

/* -------------------------------- CONSTANTS ------------------------------- */
  const _num_lots = lots.map((lot: ILotItem) => lot.NUMLOT);
  const handleNumLotChange = (event: any, newValue: number) => setSelectedNUMLOT(newValue);
  const selected_lot = lots?.find((lot) => lot.NUMLOT === selectedNUMLOT);
  const selected_lot_ID = selected_lot && selected_lot.id;
  
  const updateNumLot = async (dossierId: number) => {
    if (selectedNUMLOT && selected_lot_ID) {
        await axios.patch(`${endpoints.dossier.edit}/${dossierId}`, {lot_id: selected_lot_ID});
    }
  };

  const updateAllSelectedDossiersNUMLOT = async () => {
    for ( const dossierId of selectedDossiersIds) {
        await updateNumLot(dossierId);
    }
    fetchUpdatedDossiers();
    onClose();
  }

/* -------------------------------- RENDERING ------------------------------- */
    return (
        <Dialog
            fullWidth
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: { maxWidth: 400 }
            }}
        >
            <DialogTitle> Affecter les dossiers à un lot </DialogTitle>

            <DialogContent>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <Autocomplete
                        options={_num_lots}
                        value={selectedNUMLOT}
                        onChange={handleNumLotChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='Selectionner lot'
                                variant="outlined"
                            />
                        )}
                        fullWidth
                        disableClearable
                        getOptionLabel={(option) => option.toString()} // Ensure proper display
                        isOptionEqualToValue={(option, value) => option === value} // Compare correctly
                    />
                </FormControl>
            </DialogContent>

            <DialogActions>
                <Button variant="outlined" onClick={onClose}>
                    Annuler
                </Button>

                <LoadingButton 
                    type="submit" 
                    variant="contained"
                    onClick={updateAllSelectedDossiersNUMLOT}
                    aria-modal
                > 
                    Affecter 
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
};

export default AffectDossierToLotForm;