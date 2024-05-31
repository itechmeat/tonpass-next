'use client';

import { useCallback } from 'react'
import { useTonAddress } from '@tonconnect/ui-react'
import { Button, DatePicker, Form, Input, InputNumber } from 'antd'
import { useRouter } from 'next/navigation'
import { supabaseClient } from '@/libs/supabaseClient'
import { EventItemStruct, IEventItem } from '../types'
import styles from './EventForm.module.scss'

const { TextArea } = Input

export const EventForm = () => {
  const router = useRouter()
  const userFriendlyAddress = useTonAddress()

  const handleCreate = useCallback(
    async (ev: EventItemStruct) => {
      const { data, error } = await supabaseClient.from('events').insert([ev]).select()
      if (error) {
        console.error(error)
        return
      }
      const createdEvent = data?.[0] as IEventItem
      if (createdEvent) {
        router.push(`/events/${createdEvent.id}`)
      }
    },
    [router],
  )

  const handleSubmit = useCallback(
    async (ev: any) => {
      if (!userFriendlyAddress) return
      handleCreate({
        ...ev,
        date: ev.date?.toISOString(),
        owner_wallet: userFriendlyAddress,
      })
    },
    [handleCreate, userFriendlyAddress],
  )

  return (
    <div className={styles.list}>
      <Form name="trigger" style={{ maxWidth: 600 }} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          hasFeedback
          label="Name"
          name="name"
          validateFirst
          rules={[{ min: 3, required: true, message: 'Must be at least 3 characters' }]}
        >
          <Input placeholder="Write the name of your event" />
        </Form.Item>

        <Form.Item
          hasFeedback
          label="Description"
          name="description"
          validateFirst
          rules={[{ min: 3, required: true, message: 'Must be at least 3 characters' }]}
        >
          <TextArea rows={4} placeholder="Write event description" autoSize={{ minRows: 2 }} />
        </Form.Item>

        <Form.Item
          hasFeedback
          label="Location"
          name="location"
          validateFirst
          rules={[{ required: true }]}
        >
          <Input placeholder="Location of the event" />
        </Form.Item>

        <Form.Item hasFeedback label="Image URL" name="cover_url" validateFirst>
          <Input placeholder="Cover URL" />
        </Form.Item>

        <Form.Item hasFeedback label="Date" name="date" rules={[{ required: true }]} validateFirst>
          <DatePicker />
        </Form.Item>

        <Form.Item
          hasFeedback
          label="Ticket price"
          name="ticket_price"
          rules={[{ required: true }]}
          validateFirst
        >
          <InputNumber min={1} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
