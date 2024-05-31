'use client'

import { FC, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { ContentLoader } from '@/components/ContentLoader/ContentLoader'
import { supabaseClient } from '@/libs/supabaseClient'
import { EventItemStruct } from '../types'

export const EventsList: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [eventsList, setEventsList] = useState<EventItemStruct[]>([])

  const fetchEvents = useCallback(async () => {
    setIsLoading(true)
    let { data, error } = await supabaseClient.from('events').select('*')
    if (data) {
      setEventsList(data)
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
          {eventsList.map(event => (
            <li key={event.id}>
              <h3>
                <Link href={`/events/${event.id}`}>{event.name}</Link>
              </h3>
              <div>{event.description}</div>
              <div>
                Location: <i>{event.location}</i>
              </div>
              <div>Price: {event.ticket_price} TON</div>
              <div>{event.is_active ? 'Active' : 'Inactive'}</div>
            </li>
          ))}
        </ul>
      )}

      <p>
        <Link href="/events/create">Create new event</Link>
      </p>
    </div>
  )
}
