'use client'

import { FC, useEffect, useState } from 'react'
import {
  TonConnectButton,
  useTonAddress,
  useTonConnectUI,
  useTonWallet,
} from '@tonconnect/ui-react'
import { UserAvatar } from '@/components/UserAvatar/UserAvatar'
import { UserInfoModal } from '@/features/user/UserInfoModal/UserInfoModal'
import { useWalletStore } from '@/features/wallet/walletStore'
import { useTonConnect } from '@/hooks/useTonConnect'
import styles from './TonUser.module.scss'

export const TonUser: FC = () => {
  const { clearWallet, updateWalletData } = useWalletStore()
  const { connectionRestored, wallet } = useTonConnect()

  const userFriendlyAddress = useTonAddress()
  const walletFull = useTonWallet()

  const [isUserModalOpen, setIsUserModalOpen] = useState(false)

  useEffect(() => {
    updateWalletData('walletAddress', wallet || null)
  }, [updateWalletData, walletFull, wallet])

  const [tonConnectUI] = useTonConnectUI()

  const handleLogout = async () => {
    await tonConnectUI.disconnect()
    clearWallet()
  }

  if (!connectionRestored) {
    return <div className={styles.loading}>Please wait...</div>
  }

  return (
    <div className={styles.tonUser}>
      {userFriendlyAddress ? (
        <>
          <button className="ghostButton" onClick={() => setIsUserModalOpen(true)}>
            <UserAvatar avatarStr={userFriendlyAddress} />
          </button>

          <UserInfoModal
            isOpen={isUserModalOpen}
            walletAddress={userFriendlyAddress}
            onLogout={handleLogout}
            onClose={() => setIsUserModalOpen(false)}
          />
        </>
      ) : (
        <TonConnectButton />
      )}
    </div>
  )
}
