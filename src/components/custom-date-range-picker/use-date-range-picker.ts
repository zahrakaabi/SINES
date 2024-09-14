/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useState, useCallback } from 'react';

// Local Components
import { fDate } from 'src/utils/format-time';
import { shortDateLabel } from './utils';
import { DateRangePickerProps } from './types';

/* -------------------------------------------------------------------------- */
/*                      USE DATE RANGE PICKER CUSTOM HOOK                     */
/* -------------------------------------------------------------------------- */
type ReturnType = DateRangePickerProps;

function useDateRangePicker(start: Date | null, end: Date | null): ReturnType {
/* ---------------------------------- HOOKS --------------------------------- */
  const [open, setOpen] = useState(false);
  const [endDate, setEndDate] = useState(end);
  const [startDate, setStartDate] = useState(start);

/* -------------------------------- CONSTANTS ------------------------------- */
  const error = start && end ? new Date(start).getTime() > new Date(end).getTime() : false;

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onChangeStartDate = useCallback((newValue: Date | null) => {
    setStartDate(newValue);
  }, []);

  const onChangeEndDate = useCallback(
    (newValue: Date | null) => {
      if (error) {
        setEndDate(null);
      }
      setEndDate(newValue);
    },
    [error]
  );

  const onReset = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
  }, []);

/* -------------------------------- RENDERING ------------------------------- */
  return {
    startDate,
    endDate,
    onChangeStartDate,
    onChangeEndDate,
    //
    open,
    onOpen,
    onClose,
    onReset,
    //
    selected: !!startDate && !!endDate,
    error,
    //
    label: `${fDate(startDate)} - ${fDate(endDate)}`,
    shortLabel: shortDateLabel(startDate, endDate),
    //
    setStartDate,
    setEndDate,
  };
};

export default useDateRangePicker;