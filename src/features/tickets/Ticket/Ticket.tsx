import { FC } from 'react'
import { ITicket } from '@/features/eventList/types'
import styles from './Ticket.module.scss'

type Props = {
  ticket: ITicket
}

export const Ticket: FC<Props> = ({ ticket }) => {
  return (
    <div className={styles.ticket}>
      <div key={ticket.id}>
        <h3>{ticket.id}</h3>
        <div>Price: {ticket.ticket_price} TON</div>
        <div>Event: {ticket.events?.name}</div>
      </div>
      <div className={styles.code}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {ticket.data_image && <img src={ticket.data_image} alt="" />}
      </div>
    </div>
  )
}
