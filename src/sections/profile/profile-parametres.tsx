'use client';

/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import * as Yup from 'yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// MUI
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

// Local Components
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar
} from 'src/components/hook-form';
import { fData } from 'src/utils/format-number';
import { useSnackbar } from 'src/components/snackbar';
import { IconButton, InputAdornment, MenuItem } from '@mui/material';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { RHFSelect } from 'src/components/hook-form/rhf-select';
import { useMockedUser } from 'src/hooks/use-mocked-user';

/* -------------------------------------------------------------------------- */
/*                             PROFILE PARAMETRES                             */
/* -------------------------------------------------------------------------- */
type UserType = {
  NOM: string,
  PRENOM: string,
  role: string,
  password: string,
  roles: string,
  photoURL: any,
  isPublic: boolean
};

function ProfileParametres() {
/* ---------------------------------- HOOKS --------------------------------- */
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useMockedUser();
  const password = useBoolean();
    
  const UpdateUserSchema = Yup.object().shape({
    NOM: Yup.string().required('Nom est obligé'),
    PRENOM: Yup.string().required('Prènom est obligé'),
    role: Yup.string().required('Code User est obligé'),
    password: Yup.string().required('Mot De Passe est obligé'),
    roles: Yup.string().required('Role est obligé'),
    photoURL: Yup.mixed<any>().nullable().required('Avatar est obligé'),
    // not required
    isPublic: Yup.boolean()
  });

  const defaultValues: UserType = {
    NOM: user?.NOM || '',
    PRENOM: user?.PRENOM || '',
    role: user?.role || '',
    password: user?.password || '',
    roles: user?.roles || 'ROLE_ADMIN',
    photoURL: user?.photoURL || null,
    isPublic: user?.isPublic || false,
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

/* ------------------------------ HANDLE SUBMIT ----------------------------- */
  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('Modification avec succée!');
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

/* ------------------------------- HANDLE DROP ------------------------------ */
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('photoURL', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

/* -------------------------------- RENDERING ------------------------------- */
    return(
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <Grid container spacing={3}>
                <Grid xs={12} md={4}>
                    <Card sx={{ pt: 10, pb: 5, px: 3, textAlign: 'center' }}>
                        <RHFUploadAvatar
                            name="photoURL"
                            maxSize={3145728}
                            onDrop={handleDrop}
                            helperText={
                                <Typography
                                    variant="caption"
                                    sx={{
                                        mt: 3,
                                        mx: 'auto',
                                        display: 'block',
                                        textAlign: 'center',
                                        color: 'text.disabled',
                                    }}
                                >
                                    Allowed *.jpeg, *.jpg, *.png, *.gif
                                    <br /> max size of {fData(3145728)}
                                </Typography>
                            }
                        />

                        <RHFSwitch
                            name="isPublic"
                            labelPlacement="start"
                            label="Profile Publique"
                            sx={{ mt: 5 }}
                        />

                        <Button variant="soft" color="error" sx={{ mt: 3 }}>
                            Supprimer Utilisateur
                        </Button>
                    </Card>
                </Grid>

                <Grid xs={12} md={8}>
                    <Card sx={{ p: 3 }}>
                        <Box
                            rowGap={3}
                            columnGap={2}
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(2, 1fr)',
                            }}
                        >
                            <RHFTextField name="NOM" label="Nom" />
                            <RHFTextField name="PRENOM" label="Prènom" />
                            <RHFTextField name="role" label="Code User" />
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
                            name="roles"
                            label="Role"
                            InputLabelProps={{ shrink: true }}
                            PaperPropsSx={{ textTransform: 'capitalize' }}
                          >
                            {['ROLE_ADMIN', 'ROLE_UTILISATEUR'].map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </RHFSelect>
                        </Box>

                        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                Enregistrer
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    )
}

export default ProfileParametres;