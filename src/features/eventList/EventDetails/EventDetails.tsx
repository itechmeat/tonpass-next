'use client'

import { FC, useCallback, useEffect, useState } from 'react'
import { CHAIN, SendTransactionRequest, useTonConnectUI } from '@tonconnect/ui-react'
import { Button } from 'antd'
import { toNano } from 'ton-core'
import { ContentLoader } from '@/components/ContentLoader/ContentLoader'
import { Heading } from '@/components/Heading/Heading'
import { supabaseClient } from '@/libs/supabaseClient'
import { EventItemStruct } from '../types'

type Props = {
  address: string
}

export const EventDetails: FC<Props> = ({ address }) => {
  const [tonConnectUI] = useTonConnectUI()

  const [isLoading, setIsLoading] = useState(false)
  const [eventItem, setEventItem] = useState<EventItemStruct | null>(null)

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
            <p>
              <Button type="primary" onClick={handlePay}>
                Buy ticket for {eventItem.ticket_price} TON
              </Button>
            </p>
          </>
        )
      )}
    </div>
  )
}
