import { Metadata } from 'next'
import { Container } from '@/components/Container/Container'
import { Heading } from '@/components/Heading/Heading'

export const metadata: Metadata = {
  title: 'Event page - TonPass',
  description: 'Event page',
}

export default function EventPage({ params }: any) {
  const pageAddress = params.address

  return (
    <Container>
      <Heading title="Event Page" />
      <p>pageAddress: {pageAddress}</p>
    </Container>
  )
}
