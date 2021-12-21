import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from '@mui/material'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import myAxios from './myAxios'

export default function AlterBid(props: any) {
  const [amount, setAmount] = React.useState(props.value)
  async function place() {
    const res = await myAxios.patch('/shipments/' + props.id + '/bids', {
      amount: amount,
      driver: {
        "id": 2654,
        "display_name": "Driver McDrivy",
        "first_name": "Driver",
        "full_name": "Driver Driverson",
        "profile_slug": "the-driver"
      }
    })
    props.fetchShipments()
  }

  return (
    <div>
      <TextField id="outlined-basic" label="Amount" variant="outlined" type="number" value={amount} size="small" onChange={(e) => {
        setAmount(parseInt(e.target.value, 10))
        console.log(amount)
      }
      } />
      <Button variant="contained" onClick={place} >
        Change
      </Button>
    </div>
  );
}