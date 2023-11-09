import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, thismonth, ytd) {
  return { name, thismonth, ytd };
}

const rows = [
  createData('Sales', 159, 6.0, 24, 4.0),
  createData('Advertising', 237, 9.0, 37, 4.3),
  createData('Inventory', 262, 16.0, 24, 6.0),
  createData('Entertainment', 305, 3.7, 67, 4.3),
  createData('Product', 356, 16.0, 49, 3.9),
];

const AccountWatchlist = () => {
  return (
   <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Account</TableCell>
            <TableCell align="right">This Month</TableCell>
            <TableCell align="right">YTD&nbsp;(g)</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.thismonth}</TableCell>
              <TableCell align="right">{row.ytd}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </>
   
  );
};

export default AccountWatchlist;
