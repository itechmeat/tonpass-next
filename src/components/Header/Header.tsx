'use client'

import { FC, PropsWithChildren, useEffect, useState } from 'react'
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
    console.log('🤓', user)
    if (user) setIsAuthenticated(true)
  }

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <AntHeader className={styles.header}>
      <Container className={styles.wrapper}>
        <Link href="/" className={styles.logo}>
          <svg width="40" viewBox="0 0 1024 660" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M40 22H984C993.941 22 1002 30.0589 1002 40V136.379C1002 143.862 996.89 152.877 986.938 158.975C950.969 181.015 893.5 232.062 893.5 330C893.5 427.938 950.969 478.985 986.938 501.025C996.89 507.123 1002 516.138 1002 523.621V620C1002 629.941 993.941 638 984 638H40C30.0589 638 22 629.941 22 620V40C22 30.0589 30.0589 22 40 22Z"
              fill="white"
              stroke="#0088CC"
              strokeWidth="44"
            />
            <rect x="659" y="31.5" width="40" height="88" rx="20" fill="#0088CC" />
            <rect x="659" y="159.5" width="40" height="88" rx="20" fill="#0088CC" />
            <rect x="659" y="287.5" width="40" height="88" rx="20" fill="#0088CC" />
            <rect x="659" y="415.5" width="40" height="88" rx="20" fill="#0088CC" />
            <rect x="659" y="543.5" width="40" height="88" rx="20" fill="#0088CC" />
            <path
              d="M194.659 208.5H485.341C491.431 208.5 495.288 215.034 492.345 220.366L347.004 483.698C343.962 489.211 336.038 489.211 332.996 483.698L187.655 220.366C184.712 215.034 188.569 208.5 194.659 208.5Z"
              stroke="#0088CC"
              strokeWidth="32"
            />
            <rect x="324.5" y="213" width="32" height="262" fill="#0088CC" />
          </svg>

          {/* <span className={styles.logoText}>TonPass</span> */}
        </Link>

        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <Link href="/events" className={styles.menuLink}>
              Events
            </Link>
          </li>
          {isAuthenticated && (
            <li className={styles.menuItem}>
              <Link href="/tickets" className={styles.menuLink}>
                Tickets
              </Link>
            </li>
          )}
        </ul>

        <div className={styles.userPlace}>
          {!isAuthenticated ? (
            <AuthModal onLogin={() => checkUser()} />
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
