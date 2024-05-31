'use client'

import { FC, useCallback, useEffect, useState } from 'react'
import { ContentLoader } from '@/components/ContentLoader/ContentLoader'
import { Heading } from '@/components/Heading/Heading'
import { supabaseClient } from '@/libs/supabaseClient'
import { EventItemStruct } from '../types'

type Props = {
  address: string
}

export const EventDetails: FC<Props> = ({ address }) => {
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

  return (
    <div>{isLoading ? <ContentLoader /> : eventItem && <Heading title={eventItem.name} />}</div>
  )
}
