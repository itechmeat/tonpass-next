import { Eruda } from 'eruda'
import dynamic from 'next/dynamic';
import { useWalletStore } from '@/features/wallet/walletStore'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { SDKProvider } from '@tma.js/sdk-react'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { useEffect, useState } from 'react'
const TelegramProvider = dynamic(() => import('@/components/TelegramProvider/TelegramProvider'));

function MainLayout ({ children }) {
  const { isDebugMode } = useWalletStore()
  const [ eruda, setEruda ] = useState<Eruda | null>(null)

  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL

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

  if (typeof window === 'undefined') return null;

  return (
    <SDKProvider>
      <TonConnectUIProvider manifestUrl={`${siteUrl}/tonconnect-manifest.json`}>
        <AntdRegistry>
          <TelegramProvider>
            <div className="layout">
              <Header />
              <main className="main">{children}</main>
              <Footer />
            </div>
          </TelegramProvider>
        </AntdRegistry>
      </TonConnectUIProvider>
    </SDKProvider>
  );
}

export default MainLayout
