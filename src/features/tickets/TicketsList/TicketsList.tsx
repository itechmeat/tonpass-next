'use client'

import { FC, useCallback, useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { ContentLoader } from '@/components/ContentLoader/ContentLoader'
import { supabaseClient } from '@/libs/supabaseClient'
import { ITicket } from '../../eventList/types'
import { Ticket } from '../Ticket/Ticket'
import styles from './TicketsList.module.scss'

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
    <div className={styles.ticketsList}>
      {isLoading ? (
        <ContentLoader />
      ) : (
        ticketsList.map(ticket => <Ticket key={ticket.id} ticket={ticket} />)
      )}
    </div>
  )
}
