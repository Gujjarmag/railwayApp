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

// -----------------------------------------------

const DataTable = ({ title, columns, data, emptyMsg }) => (
  <Card>
    <CardHeader title={title} />
    <CardContent>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col, idx) => (
                <TableCell key={idx} align={col.align || 'left'}>
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
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      align: PropTypes.oneOf(['left', 'right', 'center']),
    })
  ).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.array // assuming data is an array of arrays (rows)
  ).isRequired,
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
              columns={[{ label: 'Train Name' }]}
              data={lateTrains}
              emptyMsg="No late trains"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DataTable
              title="Full Trains"
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
              columns={[{ label: 'Train Name' }, { label: 'Passenger Count', align: 'right' }]}
              data={topPassengers}
              emptyMsg="No passenger data"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DataTable
              title="Top Logins"
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
