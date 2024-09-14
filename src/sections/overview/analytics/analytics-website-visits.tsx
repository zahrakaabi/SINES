/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { ApexOptions } from 'apexcharts';

// MUI
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';

// UI Local Components
import Chart, { useChart } from 'src/components/chart';

/* -------------------------------------------------------------------------- */
/*                                  INTERFACE                                 */
/* -------------------------------------------------------------------------- */
interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    labels: string[];
    colors?: string[];
    series: {
      name: string;
      type: string;
      fill?: string;
      data: number[];
    }[];
    options?: ApexOptions;
  };
}

/* -------------------------------------------------------------------------- */
/*                          ANALYTICS WEBSITE VISITS                          */
/* -------------------------------------------------------------------------- */
function AnalyticsWebsiteVisits({ title, subheader, chart, ...other }: Props) {
/* -------------------------------- CONSTANTS ------------------------------- */
  const { labels, colors, series, options } = chart;

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '16%',
      },
    },
    fill: {
      type: series.map((i) => i.fill) as string[],
    },
    labels,
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value: number) => {
          if (typeof value !== 'undefined') {
            return `${value.toFixed(0)} visits`;
          }
          return value;
        },
      },
    },
    ...options,
  });

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          dir="ltr"
          type="line"
          series={series}
          options={chartOptions}
          width="100%"
          height={364}
        />
      </Box>
    </Card>
  );
};

export default AnalyticsWebsiteVisits;