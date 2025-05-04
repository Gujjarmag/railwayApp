import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import {
  Container,
  Stack,
  Button,
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Grid,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import axios from 'axios';

// -----------------------------------------------

const DataTable = ({ title, icon, columns, data, emptyMsg }) => (
  <Card
    elevation={4}
    sx={{
      borderRadius: 3,
      overflow: 'hidden',
    }}
  >
    <CardHeader
      avatar={icon && <Iconify icon={icon} width={28} height={28} />}
      title={
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
      }
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        py: 2,
      }}
    />
    <CardContent sx={{ p: 0 }}>
      <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
            <TableRow>
              {columns.map((col, idx) => (
                <TableCell key={idx} align={col.align || 'left'} sx={{ fontWeight: 'bold' }}>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, i) => (
                <TableRow key={i}>
                  {row.map((cell, j) => (
                    <TableCell key={j} align={columns[j].align || 'left'}>
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  {emptyMsg}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  </Card>
);

DataTable.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      align: PropTypes.oneOf(['left', 'right', 'center']),
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
  emptyMsg: PropTypes.string.isRequired,
};

// -----------------------------------------------

export default function AnalyticsView() {
  const [value, setValue] = useState(0);
  const [lateTrains, setLateTrains] = useState([]);
  const [fullTrains, setFullTrains] = useState([]);
  const [topFares, setTopFares] = useState([]);
  const [topPassengers, setTopPassengers] = useState([]);
  const [topLogins, setTopLogins] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      setLateTrains([['Tezgam'], ['Khyber Mail']]);
      setFullTrains([['Tezgam'], ['Awam Express'], ['Khyber Mail']]);
      setTopFares([['Khyber Mail', 3200]]);
      setTopPassengers([
        ['Awam Express', 400],
        ['Khyber Mail', 360],
      ]);
      setTopLogins([['Awam Express', 90]]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event, newValue) => setValue(newValue);

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Train Analytics Dashboard</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="eva:refresh-fill" />}
          onClick={fetchData}
        >
          Refresh Data
        </Button>
      </Stack>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Train Status" />
          <Tab label="Financial" />
          <Tab label="Usage" />
        </Tabs>
      </Box>

      {value === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DataTable
              title="Late Trains"
              icon="mdi:clock-alert-outline"
              columns={[{ label: 'Train Name' }]}
              data={lateTrains}
              emptyMsg="No late trains"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DataTable
              title="Full Trains"
              icon="mdi:train-car"
              columns={[{ label: 'Train Name' }]}
              data={fullTrains}
              emptyMsg="No full trains"
            />
          </Grid>
        </Grid>
      )}

      {value === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DataTable
              title="Top Fares"
              icon="mdi:currency-inr"
              columns={[{ label: 'Train Name' }, { label: 'Fare (Rs)', align: 'right' }]}
              data={topFares.map(([name, fare]) => [name, fare.toLocaleString()])}
              emptyMsg="No fare data"
            />
          </Grid>
        </Grid>
      )}

      {value === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DataTable
              title="Top Passengers"
              icon="mdi:account-group-outline"
              columns={[{ label: 'Train Name' }, { label: 'Passenger Count', align: 'right' }]}
              data={topPassengers}
              emptyMsg="No passenger data"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DataTable
              title="Top Logins"
              icon="mdi:login-variant"
              columns={[{ label: 'Train Name' }, { label: 'Login Count', align: 'right' }]}
              data={topLogins}
              emptyMsg="No login data"
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
