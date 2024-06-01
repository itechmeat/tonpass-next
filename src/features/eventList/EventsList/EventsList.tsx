/* eslint-disable @next/next/no-img-element */
'use client'

import { FC, useCallback, useEffect, useState } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { ContentLoader } from '@/components/ContentLoader/ContentLoader'
import { supabaseClient } from '@/libs/supabaseClient'
import { IEventItem } from '../types'
import styles from './EventsList.module.scss'

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

export const EventsList: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [eventsList, setEventsList] = useState<IEventItem[]>([])

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

  console.log(eventsList)

  return (
    <div>
      {isLoading ? (
        <ContentLoader />
      ) : (
        <ul className={styles.eventsList}>
          {eventsList.map(event => (
            <li key={event.id} className={styles.item}>
              <Link className={styles.link} href={`/events/${event.id}`}>
                <div className={styles.eventCover}>
                  <img
                    className={styles.eventImage}
                    src={
                      event.cover_url ||
                      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/covers/${event.id}`
                    }
                    alt=""
                  />
                </div>
                <div className={styles.eventDescription}>
                  <h3 className={styles.eventName}>{event.name}</h3>
                  <p className={styles.eventLocationAndDate}>
                    <i>Location: {event.location}</i>
                  </p>
                  <p className={styles.eventLocationAndDate}>
                    <i>Date: {event.date}</i>
                  </p>
                </div>
                {/* <div className={styles.eventFullDescription}>
                <div>Price: {event.ticket_price} TON</div>
                <div>{event.is_active ? 'Active' : 'Inactive'}</div>
                <div>{event.description}</div>
              </div> */}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
