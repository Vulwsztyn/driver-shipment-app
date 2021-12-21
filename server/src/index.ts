import express from 'express'
import {Request, Response, Express, NextFunction} from 'express'
import cors from 'cors'
import {data as state} from './data'
import {Bid, Driver} from './types'

const port = 8000

const options: cors.CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: 'http://localhost:3000',
    preflightContinue: false,
}

const app: Express = express()
app.use(express.urlencoded({extended: true}))
app.use(cors(options))
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.get('/shipments', (req: Request, res: Response) => {
    res.send(state)
})

app.get('/shipments/:id', (req: Request, res: Response) => {
    res.send({
        data: state.data.filter((shipment) => shipment.id === req.params.id),
    })
})

app.get('/shipments/:id/bids', (req: Request, res: Response) => {
    res.send({
        data: state.data.find((shipment) => shipment.id === req.params.id)?.bids
            ?.data,
    })
})

app.post('/shipments/:id/bids', (req: Request, res: Response) => {
    const {amount, driver}: { amount: string, driver: Driver } = req.body
    const shipment = state.data.find((shipment) => shipment.id === req.params.id)
    if (!amount || !driver) {
        res.sendStatus(400)
    }
    if (!shipment) {
        res.sendStatus(404)
    }
    const existingBid = shipment?.bids?.data?.find((bid) => bid.driver.id === driver.id)
    if (existingBid) {
        res.sendStatus(409)
    } else {
        const newBid: Bid = {
            id: new Date().valueOf() % 1000000,
            amount: parseInt(amount, 10),
            status: 'placed',
            created_at: new Date().toISOString(),
            driver: driver,
        }
        shipment?.bids?.data?.push(newBid)
        res.send(newBid)
    }
})

app.patch('/shipments/:id/bids', (req: Request, res: Response) => {
    const {amount, driver}: { amount: string, driver: Driver } = req.body
    const shipment = state.data.find((shipment) => shipment.id === req.params.id)
    if (!amount || !driver) {
        res.sendStatus(400)
    }
    if (!shipment) {
        res.sendStatus(404)
    }
    const existingBid = shipment?.bids?.data?.find((bid) => bid.driver.id === driver.id)
    if (existingBid) {
        existingBid.amount = parseInt(amount, 10)
        res.send({success: true})
    } else {
        res.sendStatus(404)
    }
})

app.delete('/shipments/:id/bids', (req: Request, res: Response) => {
    const {driver}: { amount: string, driver: Driver } = req.body
    const shipment = state.data.find((shipment) => shipment.id === req.params.id)
    if (!driver) {
        res.sendStatus(400)
    }
    if (!shipment) {
        res.sendStatus(404)
    }
    const existingBid = shipment?.bids?.data?.find((bid) => bid.driver.id === driver.id)
    if (existingBid) {
        shipment!.bids!.data = shipment!.bids!.data!.filter((bid) => bid.driver.id !== driver.id)
        res.send({success: true})
    } else {
        res.sendStatus(404)
    }
})

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`)
})
