'use client'

import { FC, useCallback, useEffect, useState } from 'react'
import { Heading } from '@/components/Heading/Heading'
import { supabaseClient } from '@/libs/supabaseClient'
import { EventItemStruct } from '../types'

type Props = {
  address: string
}

export const EventDetails: FC<Props> = ({ address }) => {
  const [eventItem, setEventItem] = useState<EventItemStruct | null>(null)

  const fetchEvents = useCallback(async () => {
    let { data, error } = await supabaseClient.from('events').select('*').eq('id', address)
    if (data?.[0]) {
      setEventItem(data?.[0])
    }
    if (error) {
      console.error(error)
    }
  }, [address])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  if (!eventItem) return null

  return (
    <div>
      <Heading title={eventItem.name} />
    </div>
  )
}
