'use client'

import { FC, useCallback, useEffect, useState } from 'react'
import { ContentLoader } from '@/components/ContentLoader/ContentLoader'
import { supabaseClient } from '@/libs/supabaseClient'
import { ITicket } from '../types'

export const TicketsList: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [ticketsList, setTicketsList] = useState<ITicket[]>([])

  const getUser = async () => {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()
    return user?.id
  }

  const fetchEvents = useCallback(async () => {
    const userId = await getUser()
    console.log('🚀 ~ fetchEvents ~ userId:', userId)
    setIsLoading(true)
    let { data, error } = await supabaseClient
      .from('tickets')
      .select(`*, events(*)`)
      .eq('buyer_id', userId)
    if (data) {
      console.log('🚀 ~ fetchEvents ~ data:', data)
      setTicketsList(data)
    }
    if (error) {
      console.error(error)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  return (
    <div>
      {isLoading ? (
        <ContentLoader />
      ) : (
        <ul>
          {ticketsList.map(ticket => (
            <li key={ticket.id}>
              <h3>{ticket.id}</h3>
              <div>Price: {ticket.ticket_price} TON</div>
              <div>Event: {ticket.events?.name}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
