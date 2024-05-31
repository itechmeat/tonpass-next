export type EventItemStruct = {
  owner_id: string
  name: string
  description?: string
  location: string
  date: string
  cover_url: string
  is_active: boolean
  ticket_price: number
  owner_wallet: string
}

export type IEventItem = EventItemStruct & {
  id: string
  created_at?: string
  updated_at?: string
}

export type TicketStruct = {
  event_id: string
  user_wallet: string
  transaction: string
  ticket_price: number
}

export type ITicket = TicketStruct & {
  id: string
  buyer_id: string
  created_at?: string
  updated_at?: string
  data_image?: string
  events?: IEventItem
}
