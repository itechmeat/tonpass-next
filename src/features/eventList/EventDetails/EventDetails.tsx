/* eslint-disable @next/next/no-img-element */
'use client'

import { FC, useCallback, useEffect, useState } from 'react'
import { CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons'
import { CHAIN, SendTransactionRequest, useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'
import { toNano } from 'ton-core'
import { ContentLoader } from '@/components/ContentLoader/ContentLoader'
import { Heading } from '@/components/Heading/Heading'
import { TonIcon } from '@/components/TonIcon/TonIcon'
import { supabaseClient } from '@/libs/supabaseClient'
import { IEventItem, ITicket, TicketStruct } from '../types'
import styles from './EventsDetails.module.scss'

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

type Props = {
  address: string
}

export const EventDetails: FC<Props> = ({ address }) => {
  const router = useRouter()
  const [tonConnectUI] = useTonConnectUI()
  const userFriendlyAddress = useTonAddress()

  const [isLoading, setIsLoading] = useState(false)
  const [eventItem, setEventItem] = useState<IEventItem | null>(null)

  const fetchEvents = useCallback(async () => {
    setIsLoading(true)
    let { data, error } = await supabaseClient.from('events').select('*').eq('id', address)
    if (data?.[0]) {
      setEventItem(data?.[0])
    }
    if (error) {
      console.error(error)
    }
    setIsLoading(false)
  }, [address])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  const createTicket = async (ticket: TicketStruct) => {
    const { data, error } = await supabaseClient.from('tickets').insert([ticket]).select()
    if (error) {
      console.error(error)
      return
    }
    const createdTicket = data?.[0] as ITicket
    if (data) {
      router.push(`/tickets?ticket=${createdTicket.id}`)
    }
  }

  const handlePay = async () => {
    if (!eventItem) return
    const transaction: SendTransactionRequest = {
      validUntil: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      network: CHAIN.TESTNET,
      messages: [
        {
          address: eventItem.owner_wallet,
          amount: String(toNano(eventItem?.ticket_price)),
        },
      ],
    }

    try {
      const response = await tonConnectUI.sendTransaction(transaction)
      createTicket({
        event_id: eventItem.id,
        ticket_price: eventItem.ticket_price,
        user_wallet: userFriendlyAddress,
        transaction: response.boc,
      })
      console.log('🚀 ~ handlePay ~ response:', response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      {isLoading ? (
        <ContentLoader />
      ) : (
        eventItem && (
          <>
            <Heading title={eventItem.name} />

            <p className={styles.img}>
              <img
                src={
                  eventItem.cover_url ||
                  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/covers/${eventItem.id}`
                }
                alt=""
                width="100%"
              />
            </p>
            <p className={styles.button}>
              <Button shape="round" type="primary" size="large" onClick={handlePay}>
                <b>
                  Buy ticket for {eventItem.ticket_price} <TonIcon size={12} />
                </b>
              </Button>
            </p>

            <p>
              <EnvironmentOutlined /> {eventItem.location}
            </p>
            <p>
              <CalendarOutlined /> {eventItem.date}
            </p>
            <p className={styles.description}>{eventItem.description}</p>
            {/* <p className={styles.button}>
              <Button shape="round" type="primary" size="large" onClick={handlePay}>
                <b>
                  Buy ticket for {eventItem.ticket_price} <TonIcon size={12} />
                </b>
              </Button>
            </p> */}
          </>
        )
      )}
    </div>
  )
}
