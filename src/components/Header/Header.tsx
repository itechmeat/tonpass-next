'use client'

import { FC, PropsWithChildren, useState } from 'react'
import { OneToOneOutlined } from '@ant-design/icons'
import { Header as AntHeader } from 'antd/es/layout/layout'
import Link from 'next/link'
import { AuthModal } from '@/features/user/AuthModal/AuthModal'
import { Network } from '@/features/wallet/Network/Network'
import { WalletSection } from '@/features/wallet/WalletSection/WalletSection'
import { supabaseClient } from '@/libs/supabaseClient'
import { Container } from '../Container/Container'
import styles from './Header.module.scss'

export const Header: FC<PropsWithChildren> = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()
    if (user) setIsAuthenticated(true)
  }

  checkUser()

  return (
    <AntHeader className={styles.header}>
      <Container className={styles.wrapper}>
        <Link href="/" className={styles.logo}>
          <OneToOneOutlined className={styles.icon} />
          <span className={styles.logoText}>TonPass</span>
        </Link>

        <div className={styles.userPlace}>
          {!isAuthenticated ? (
            <AuthModal />
          ) : (
            <>
              <Network />
              <WalletSection />
            </>
          )}
        </div>
      </Container>
    </AntHeader>
  )
}