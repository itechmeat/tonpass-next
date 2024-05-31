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
