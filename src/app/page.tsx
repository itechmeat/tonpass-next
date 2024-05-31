import { Metadata } from 'next'
import { Container } from '@/components/Container/Container'
import { Heading } from '@/components/Heading/Heading'
import { Hero } from '@/components/Hero/Hero'

export const metadata: Metadata = {
  title: 'TonPass - your ticket to the world of events!',
  description:
    'TonPass - your all-in-one tool for organizing and attending events. Buy tickets, pay with cryptocurrency, and receive unique NFTs with QR codes.',
}

export default function HomePage() {
  return (
    <>
      <Hero
        title="Step Into the Future of Event Ticketing"
        imageUrl="/images/home-hero.webp"
        ctaText="Discover Events"
        ctaUrl="/events"
      />
      <Hero
        title="Create Events in Minutes"
        text="Highlight how easy and fast it is to set up a new event using the intuitive TonPass interface."
        imageUrl="/images/home-hero-2.webp"
        ctaText="Start Now"
        ctaUrl="/events/create"
      />
      <Container>
        <Heading title="HomePage" />
      </Container>
    </>
  )
}
