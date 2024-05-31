'use client'

import { useEffect, useState } from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { SDKProvider } from '@tma.js/sdk-react'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { Eruda } from 'eruda'
import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { TelegramProvider } from '@/components/TelegramProvider/TelegramProvider'
import { useWalletStore } from '@/features/wallet/walletStore'
import '../styles/main.scss'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL
  const { isDebugMode } = useWalletStore()
  const [eruda, setEruda] = useState<Eruda | null>(null)

  useEffect(() => {
    if (isDebugMode) {
      import('eruda').then(lib => {
        setEruda(lib.default)
        lib.default.init()
        lib.default.position({ x: -20, y: -20 })
      })
    } else {
      eruda?.destroy()
    }
  }, [eruda, isDebugMode])

  return (
    <SDKProvider>
      <TonConnectUIProvider manifestUrl={`${siteUrl}/tonconnect-manifest.json`}>
        <html lang="en">
          <head>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
            <link rel="icon" href="/favicon-32x32.png" />
            <meta name="msapplication-TileColor" content="#212421" />
            <meta name="theme-color" content="#ffffff" />
          </head>

          <body>
            <AntdRegistry>
              <TelegramProvider>
                <div className="layout">
                  <Header />
                  <main className="main">{children}</main>
                  <Footer />
                </div>
              </TelegramProvider>
            </AntdRegistry>
          </body>
        </html>
      </TonConnectUIProvider>
    </SDKProvider>
  )
}
