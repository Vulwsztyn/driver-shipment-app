import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Dashboard from "./Dashboard";
import myAxios from './myAxios'
import Shipment from './Shipment'


export default function App() {
  const [shipments, setShipments] = React.useState([])
  async function fetchShipments() {
    const res = await myAxios.get('/shipments')
    setShipments(res.data.data)
  }
  React.useEffect(() => {
    fetchShipments()
  }, [])
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard shipments={shipments}/>} />
      <Route path="/:id" element={<Shipment shipments={shipments} fetchShipments={fetchShipments}/>} />
    </Routes>
  </BrowserRouter>
  );
}