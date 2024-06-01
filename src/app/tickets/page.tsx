import { Metadata } from 'next'
import { Container } from '@/components/Container/Container'
import { Heading } from '@/components/Heading/Heading'
import { TicketsList } from '@/features/tickets/TicketsList/TicketsList'

export const metadata: Metadata = {
  title: 'Events list - TonPass',
  description: 'Explore the list of upcoming events and buy tickets with cryptocurrency.',
}

export default function TicketsPage() {
  return (
    <Container>
      <Heading title="Your Tickets" />

      <TicketsList />
    </Container>
  )
}
