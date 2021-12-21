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
import PlaceBid from './PlaceBid'
import AlterBid from './AlterBid'
import myAxios from './myAxios'
import Button from '@mui/material/Button'
export default function Shipment({ shipments, fetchShipments }: { shipments: any, fetchShipments: any }) {
    
    const { id } = useParams();
    const shipment = shipments.find((e: any) => e.id === id)
    console.log(shipment.bids.data || [])

    async function removeBid() {
        const res = await myAxios.delete(`/shipments/${id}/bids`, {
           data: {
            driver: {
                "id": 2654,
                "display_name": "Driver McDrivy",
                "first_name": "Driver",
                "full_name": "Driver Driverson",
                "profile_slug": "the-driver"
                }
           }
        })
        fetchShipments()
      }

      async function alterBid() {
        const res = await myAxios.delete(`/shipments/${id}/bids`, {
           data: {
            driver: {
                "id": 2654,
                "display_name": "Driver McDrivy",
                "first_name": "Driver",
                "full_name": "Driver Driverson",
                "profile_slug": "the-driver"
                }
           }
        })
        fetchShipments()
      }

    return (
        <div>
        <h1>Shipment</h1>
  <TableContainer component={Paper}>
      <Table aria-label="simple table">
          <TableHead>
          <TableRow>
              <TableCell align="center">Attribute</TableCell>
              <TableCell align="center">Value</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
              <TableRow>
                  <TableCell align="center">Title</TableCell>
                <TableCell align="center">{shipment.title}</TableCell>
              </TableRow>
              <TableRow>
                  <TableCell align="center">Description</TableCell>
                <TableCell align="center">{shipment.about}</TableCell>
              </TableRow>
              <TableRow>
                  <TableCell align="center">Category</TableCell>
                <TableCell align="center">{shipment.category}</TableCell>
              </TableRow>
              {/* TODO: Add the rest */}
          </TableBody>  
      </Table>
  </TableContainer>
  <h1>Bids</h1>
  <PlaceBid id={id} fetchShipments={fetchShipments}/>
  <TableContainer component={Paper}>
      <Table aria-label="simple table">
          <TableHead>
          <TableRow>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Remove</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
              {(shipment.bids.data || []).map((bid: any) => 
                <TableRow>
                    {
                    bid.driver.id === 2654 ?
                    <AlterBid value={bid.amount}/>
                    : <TableCell align="center">{bid.amount}</TableCell>
                }
                  
                <TableCell align="center">{bid.status}</TableCell>
                {
                    bid.driver.id === 2654 ?
                    <TableCell align="center">
                        <Button variant="contained" onClick={removeBid} color="error">
                            Remove
                        </Button>
                        </TableCell>
                    : <></>
                }
              </TableRow>
              )}
          </TableBody>  
      </Table>
  </TableContainer>
  </div>
    );
  }