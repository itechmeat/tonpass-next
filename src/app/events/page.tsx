import { Button } from 'antd'
import { Metadata } from 'next'
import { Container } from '@/components/Container/Container'
import { Heading } from '@/components/Heading/Heading'
import { EventsList } from '@/features/eventList/EventsList/EventsList'

export const metadata: Metadata = {
  title: 'Events list - TonPass',
  description: 'Explore the list of upcoming events and buy tickets with cryptocurrency.',
}

export default function EventsPage() {
  return (
    <>
      <Container>
        <Heading
          title="Best Events"
          actions={
            <Button className="bold-btn" href="/events/create" shape="round" type="primary">
              Create new
            </Button>
          }
        />
      </Container>
      <EventsList />
    </>
  )
}
