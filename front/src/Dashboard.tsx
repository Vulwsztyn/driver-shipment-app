import React from 'react'
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
export default function Dashboard({ shipments }: { shipments: any }) {
  return (
      <div>
          <h1>Shipments</h1>
    <TableContainer component={Paper}>
        <Table aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Details</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {shipments.map((e:any) => (
                    <TableRow
                  >
                    <TableCell component="th" scope="row" align="center">
                      {e.title}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {e.about}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      <Link to={`/${e.id}`}>
                        <Button variant="contained">
                            Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>  
              
        </Table>
    </TableContainer>
    </div>
    
  )
}
