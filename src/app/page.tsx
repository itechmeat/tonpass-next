import { Metadata } from 'next'
import { Container } from '@/components/Container/Container'
import { Hero } from '@/components/Hero/Hero'

export const metadata: Metadata = {
  title: 'TonPass - your ticket to the world of events!',
  description:
    'TonPass - your all-in-one tool for organizing and attending events. Buy tickets, pay with cryptocurrency, and receive unique NFTs with QR codes.',
}

export default function HomePage() {
  return (
    <>
      <Container>
        <Hero
          title="Step Into the Future of Event Ticketing"
          imageUrl="/images/explore-events-cover.png"
          ctaText="Discover Events"
          ctaUrl="/events"
          backgroundColor="linear-gradient(80deg, #6E78FF 0%, #96A6FF 100%)"
        />
        <Hero
          title="Create Events in Minutes"
          text="Highlight how easy and fast it is to set up a new event using the intuitive TonPass interface."
          imageUrl="/images/create-events-cover.png"
          ctaText="Start Now"
          ctaUrl="/events/create"
          backgroundColor="linear-gradient(80deg, #458CFE 0%, #7DD8FD 100%)"
        />
      </Container>
    </>
  )
}
