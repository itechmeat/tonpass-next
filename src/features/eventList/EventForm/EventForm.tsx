'use client'

import { FC, PropsWithChildren, useCallback, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { useTonAddress } from '@tonconnect/ui-react'
import {
  Button,
  DatePicker,
  Form,
  GetProp,
  Input,
  InputNumber,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd'
import { useRouter } from 'next/navigation'
import { supabaseClient, uploadFile } from '@/libs/supabaseClient'
import { EventItemStruct, IEventItem } from '../types'
import styles from './EventForm.module.scss'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const { TextArea } = Input

export const EventForm: FC<PropsWithChildren> = () => {
  const router = useRouter()
  const userFriendlyAddress = useTonAddress()

  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [uploading, setUploading] = useState(false)

  const coverProps: UploadProps = {
    onRemove: file => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: file => {
      setFileList([...fileList, file])

      return false
    },
    fileList,
  }

  const uploadCover = useCallback(
    async (eventId: string) => {
      const formData = new FormData()
      fileList.forEach(file => {
        console.log('🚀 ~ file:', file)
        formData.append('files[]', file as FileType)
      })
      setUploading(true)
      // @ts-ignore
      await uploadFile(fileList[0] as File, eventId)
    },
    [fileList],
  )

  const handleCreate = useCallback(
    async (ev: EventItemStruct) => {
      const { data, error } = await supabaseClient.from('events').insert([ev]).select()
      if (error) {
        console.error(error)
        return
      }
      const createdEvent = data?.[0] as IEventItem
      if (createdEvent) {
        await uploadCover(createdEvent.id)
        router.push(`/events/${createdEvent.id}`)
      }
    },
    [router, uploadCover],
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

        <Form.Item>
          <Upload {...coverProps}>
            <Button icon={<UploadOutlined />}>Select cover for the event</Button>
          </Upload>
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
          <Button shape="round" type="primary" htmlType="submit" size="large">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
