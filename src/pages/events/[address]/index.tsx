import { Metadata } from 'next'
import { Container } from '@/components/Container/Container'
import { EventDetails } from '@/features/eventList/EventDetails/EventDetails'

export const metadata: Metadata = {
  title: 'Event page - TonPass',
  description: 'Event page',
}

export default function EventPage({ params }: any) {
  const pageAddress = params.address

  return (
    <Container>
      <EventDetails address={pageAddress} />
    </Container>
  )
}
