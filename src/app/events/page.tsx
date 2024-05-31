import { Metadata } from 'next'
import { Container } from '@/components/Container/Container'
import { Heading } from '@/components/Heading/Heading'

export const metadata: Metadata = {
  title: 'Events list - TonPass',
  description: 'Explore the list of upcoming events and buy tickets with cryptocurrency.',
}

export default function EventsPage() {
  return (
    <Container>
      <Heading title="Events Page" />
    </Container>
  )
}
