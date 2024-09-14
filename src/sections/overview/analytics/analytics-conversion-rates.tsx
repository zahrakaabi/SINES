/* -------------------------------------------------------------------------- */
/*                                 DEPENDENCIES                               */
/* -------------------------------------------------------------------------- */
// Packages
import { ApexOptions } from 'apexcharts';

// MUI
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';

// UI Local Components
import { fNumber } from 'src/utils/format-number';
import Chart, { useChart } from 'src/components/chart';

/* -------------------------------------------------------------------------- */
/*                                   INTERFACE                                */
/* -------------------------------------------------------------------------- */
interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    series: {
      label: string;
      value: number;
    }[];
    options?: ApexOptions;
  };
}

/* -------------------------------------------------------------------------- */
/*                           ANALYTICS CONVERSION RATES                       */
/* -------------------------------------------------------------------------- */
function AnalyticsConversionRates({ title, subheader, chart, ...other }: Props) {
/* -------------------------------- CONSTANTS ------------------------------- */
  const { colors, series, options } = chart;

  const chartSeries = series.map((i) => i.value);

  const chartOptions = useChart({
    colors,
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (value: number) => fNumber(value),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '28%',
        borderRadius: 2,
      },
    },
    xaxis: {
      categories: series.map((i) => i.label),
    },
    ...options,
  });

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Box sx={{ mx: 3 }}>
        <Chart
          dir="ltr"
          type="bar"
          series={[{ data: chartSeries }]}
          options={chartOptions}
          width="100%"
          height={364}
        />
      </Box>
    </Card>
  );
}

export default AnalyticsConversionRates;