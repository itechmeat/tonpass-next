'use client'

import { FC, useCallback, useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { ContentLoader } from '@/components/ContentLoader/ContentLoader'
import { supabaseClient } from '@/libs/supabaseClient'
import { ITicket } from '../types'

export const TicketsList: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [ticketsList, setTicketsList] = useState<ITicket[]>([])

  const generateQR = async (text: string) => {
    try {
      const result = await QRCode.toDataURL(text)
      return result.toString()
    } catch (err) {
      console.error(err)
    }
  }

  const getUser = async () => {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()
    return user?.id
  }

  const fetchEvents = useCallback(async () => {
    const userId = await getUser()
    setIsLoading(true)
    let { data, error } = await supabaseClient
      .from('tickets')
      .select(`*, events(*)`)
      .eq('buyer_id', userId)
    if (data) {
      const result = [] as ITicket[]
      for (const item of data) {
        result.push({
          ...item,
          data_image: await generateQR(
            `${process.env.NEXT_PUBLIC_BASE_URL}/tickets?ticket=${item.id}`,
          ),
        })
      }
      setTicketsList(result)
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {ticket.data_image && <img src={ticket.data_image} alt="" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
