/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { getYear, isSameDay, isSameMonth } from 'date-fns';

// Local Components
import { fDate } from 'src/utils/format-time';

/* -------------------------------------------------------------------------- */
/*                              SHORT DATE LABEL                              */
/* -------------------------------------------------------------------------- */
export function shortDateLabel(startDate: Date | null, endDate: Date | null) {
/* -------------------------------- CONSTANTS ------------------------------- */
  const getCurrentYear = new Date().getFullYear();

  const startDateYear = startDate ? getYear(startDate) : null;

  const endDateYear = endDate ? getYear(endDate) : null;

  const currentYear = getCurrentYear === startDateYear && getCurrentYear === endDateYear;

  const sameDay = startDate && endDate ? isSameDay(new Date(startDate), new Date(endDate)) : false;

  const sameMonth =
    startDate && endDate ? isSameMonth(new Date(startDate), new Date(endDate)) : false;

  if (currentYear) {
    if (sameMonth) {
      if (sameDay) {
        return fDate(endDate, 'dd MMM yy');
      }
      return `${fDate(startDate, 'dd')} - ${fDate(endDate, 'dd MMM yy')}`;
    }
    return `${fDate(startDate, 'dd MMM')} - ${fDate(endDate, 'dd MMM yy')}`;
  }

/* -------------------------------- RENDERING ------------------------------- */
  return `${fDate(startDate, 'dd MMM yy')} - ${fDate(endDate, 'dd MMM yy')}`;
};