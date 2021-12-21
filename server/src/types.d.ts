export interface Driver {
    id: number
    display_name: string
    first_name: string
    full_name: string
    profile_slug: string
}

export type BidStatus = 'placed' | 'unavailable'

export interface Bid {
    id: number
    amount: number
    status: BidStatus
    created_at: string
    driver: Driver
}
