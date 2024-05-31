'use client'

import { FC, PropsWithChildren } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseClient } from '@/libs/supabaseClient'
import { EventItemStruct } from '../types'
import styles from './EventForm.module.scss'

export const EventForm: FC<PropsWithChildren> = () => {
  const router = useRouter()

  const handleCreate = async () => {
    const completedEvent = {
      name: 'New event',
      description: 'DSC',
      location: 'Belgrade',
      ticket_price: 5,
      is_active: false,
    }
    const { data, error } = await supabaseClient.from('events').insert([completedEvent]).select()
    const createdEvent = data?.[0] as EventItemStruct
    if (error) {
      console.error(error)
      return
    }
    if (createdEvent) {
      router.push(`/events/${createdEvent.id}`)
    }
  }

  return (
    <div className={styles.list}>
      <button onClick={() => handleCreate()}>Create</button>
    </div>
  )
}
