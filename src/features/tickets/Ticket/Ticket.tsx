import { FC, useState } from 'react'
import { CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import { TonIcon } from '@/components/TonIcon/TonIcon'
import { ITicket } from '@/features/eventList/types'
import styles from './Ticket.module.scss'

type Props = {
  ticket: ITicket
}

export const Ticket: FC<Props> = ({ ticket }) => {
  console.log(ticket)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <div className={styles.ticket}>
      <div key={ticket.id} className={styles.info}>
        <p className={styles.label}>Ticket for:</p>
        <h4>{ticket.events?.name}</h4>
        <div className={styles.base_information}>
          <div>
            <div className={styles.location}>
              <EnvironmentOutlined />
              {' ' + ticket.events?.location}
            </div>
            <div className={styles.date}>
              <CalendarOutlined />
              {' ' + ticket.events?.date}
            </div>
          </div>

          <div className={styles.price}>
            Price: {ticket.ticket_price}
            <span className={styles.span}>
              {' '}
              <TonIcon className={styles.ton_icon} size={12} />
            </span>
          </div>
        </div>
      </div>
      <div className={styles.code} onClick={showModal}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {ticket.data_image && <img src={ticket.data_image} alt="" className={styles.data_image} />}
      </div>
      <Modal title="" open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel}>
        {ticket.data_image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={ticket.data_image} alt="" className={styles.data_image_opened} />
        )}
      </Modal>
    </div>
  )
}
