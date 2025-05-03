import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function AnalyticsView() {
  const [value, setValue] = useState(0);
  const [lateTrains, setLateTrains] = useState([]);
  const [fullTrains, setFullTrains] = useState([]);
  const [topFares, setTopFares] = useState([]);
  const [topPassengers, setTopPassengers] = useState([]);
  const [topLogins, setTopLogins] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // Fetch data from APIs
    const fetchData = async () => {
      try {
        // In a real application, you would call actual endpoints
        // For now, using the sample data provided
        setLateTrains([['Tezgam'], ['Khyber Mail']]);
        setFullTrains([['Tezgam'], ['Awam Express'], ['Khyber Mail']]);
        setTopFares([['Khyber Mail', 3200.0]]);
        setTopPassengers([
          ['Awam Express', 400],
          ['Khyber Mail', 360],
        ]);
        setTopLogins([['Awam Express', 90]]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:refresh-fill" />}>
          Refresh Data
        </Button>
      </Stack>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={value} onChange={handleChange} aria-label="analytics tabs">
          <Tab label="Train Status" />
          <Tab label="Financial" />
          <Tab label="Usage" />
        </Tabs>
      </Box>

      {value === 0 && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Card>
              <CardHeader title="Late Trains" />
              <CardContent>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Train Name</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {lateTrains.map((train, index) => (
                        <TableRow key={index}>
                          <TableCell>{train[0]}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={6}>
            <Card>
              <CardHeader title="Full Trains" />
              <CardContent>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Train Name</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {fullTrains.map((train, index) => (
                        <TableRow key={index}>
                          <TableCell>{train[0]}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {value === 1 && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Card>
              <CardHeader title="Top Fares" />
              <CardContent>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Train Name</TableCell>
                        <TableCell align="right">Fare (Rs)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {topFares.map((fare, index) => (
                        <TableRow key={index}>
                          <TableCell>{fare[0]}</TableCell>
                          <TableCell align="right">{fare[1].toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {value === 2 && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Card>
              <CardHeader title="Top Passengers" />
              <CardContent>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Train Name</TableCell>
                        <TableCell align="right">Passenger Count</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {topPassengers.map((passenger, index) => (
                        <TableRow key={index}>
                          <TableCell>{passenger[0]}</TableCell>
                          <TableCell align="right">{passenger[1]}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={6}>
            <Card>
              <CardHeader title="Top Logins" />
              <CardContent>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Train Name</TableCell>
                        <TableCell align="right">Login Count</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {topLogins.map((login, index) => (
                        <TableRow key={index}>
                          <TableCell>{login[0]}</TableCell>
                          <TableCell align="right">{login[1]}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
