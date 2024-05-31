import { Metadata } from 'next'
import { Container } from '@/components/Container/Container'
import { Heading } from '@/components/Heading/Heading'

export const metadata: Metadata = {
  title: 'TonPass - your ticket to the world of events!',
  description:
    'TonPass - your all-in-one tool for organizing and attending events. Buy tickets, pay with cryptocurrency, and receive unique NFTs with QR codes.',
}

export default function HomePage() {
  return (
    <>
      <Container>
        <Heading title="HomePage" />
      </Container>
    </>
  )
}
