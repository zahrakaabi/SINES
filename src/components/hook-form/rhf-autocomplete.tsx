/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { Controller, useFormContext } from 'react-hook-form';

// MUI
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';

// UI Local Components
import { gouvernements } from 'src/assets/data';
import Iconify from 'src/components/iconify';

/* -------------------------------------------------------------------------- */
/*                                  INTERFACE                                 */
/* -------------------------------------------------------------------------- */
interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  label?: string;
  placeholder?: string;
  type?: 'gouvernement' | string;
  helperText?: React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/*                              RHF AUTOCOMPLETE                              */
/* -------------------------------------------------------------------------- */
function RHFAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  name,
  label,
  type,
  helperText,
  placeholder,
  ...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {
/* ---------------------------------- HOOKS --------------------------------- */
  const { control, setValue } = useFormContext();

/* -------------------------------- CONSTANTS ------------------------------- */
  const { multiple } = other;

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        if (type === 'country') {
          return (
            <Autocomplete
              {...field}
              autoHighlight={!multiple}
              disableCloseOnSelect={multiple}
              onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
              renderOption={(props, option) => {
                const country = getGouvernement(option as string);

                if (!country.label) {
                  return null;
                }

                return (
                  <li {...props} key={country.label}>
                    <Iconify
                      key={country.label}
                      icon={`circle-flags:${country.code?.toLowerCase()}`}
                      sx={{ mr: 1 }}
                    />
                    {country.label} ({country.code}) +{country.phone}
                  </li>
                );
              }}
              renderInput={(params) => {
                const country = getGouvernement(params.inputProps.value as string);

                const baseField = {
                  ...params,
                  label,
                  placeholder,
                  error: !!error,
                  helperText: error ? error?.message : helperText,
                  inputProps: {
                    ...params.inputProps,
                    autoComplete: 'new-password',
                  },
                };

                if (multiple) {
                  return <TextField {...baseField} />;
                }

                return (
                  <TextField
                    {...baseField}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{
                            ...(!country.code && {
                              display: 'none',
                            }),
                          }}
                        >
                          <Iconify
                            icon={`circle-flags:${country.code?.toLowerCase()}`}
                            sx={{ mr: -0.5, ml: 0.5 }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                );
              }}
              renderTags={(selected, getTagProps) =>
                selected.map((option, index) => {
                  const country = getGouvernement(option as string);

                  return (
                    <Chip
                      {...getTagProps({ index })}
                      key={country.label}
                      label={country.label}
                      icon={<Iconify icon={`circle-flags:${country.code?.toLowerCase()}`} />}
                      size="small"
                      variant="soft"
                    />
                  );
                })
              }
              {...other}
            />
          );
        }

        return (
          <Autocomplete
            {...field}
            id={`autocomplete-${name}`}
            onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                error={!!error}
                helperText={error ? error?.message : helperText}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password',
                }}
              />
            )}
            {...other}
          />
        );
      }}
    />
  );
};

export default RHFAutocomplete;

/* -------------------------------------------------------------------------- */
/*                              GET GOUVERNEMENT                              */
/* -------------------------------------------------------------------------- */
export function getGouvernement(inputValue: string) {
  const option = gouvernements.filter((gouvernement) => gouvernement.label === inputValue)[0];
  return {
    ...option,
  };
};