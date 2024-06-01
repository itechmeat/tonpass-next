'use client'

import { FC, useCallback, useEffect, useState } from 'react'
import { Button, Empty } from 'antd'
import { ContentLoader } from '@/components/ContentLoader/ContentLoader'
import { supabaseClient } from '@/libs/supabaseClient'
import { ITicket } from '../../eventList/types'
import { Ticket } from '../Ticket/Ticket'
import styles from './TicketsList.module.scss'

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
    setIsLoading(true)
    let { data, error } = await supabaseClient
      .from('tickets')
      .select(`*, events(*)`)
      .eq('buyer_id', userId)
    if (data) {
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
    <div className={styles.ticketsList}>
      {isLoading ? (
        <ContentLoader />
      ) : ticketsList.length === 0 ? (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{ height: 60 }}
          description={<span>Currently you have no events</span>}
        >
          <Button className="bold-btn" href="/events" shape="round" type="primary">
            Find an Event
          </Button>
        </Empty>
      ) : (
        ticketsList.map(ticket => <Ticket key={ticket.id} ticket={ticket} />)
      )}
    </div>
  )
}
