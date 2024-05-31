import { CheckCircleOutlined, IssuesCloseOutlined } from '@ant-design/icons'
import { CHAIN } from '@tonconnect/sdk'
import cn from 'classnames'
import { useTonConnect } from '@/hooks/useTonConnect'
import styles from './Network.module.scss'

export const Network = () => {
  const { network } = useTonConnect()

  const isTestnet = network === CHAIN.TESTNET
  const networkName = isTestnet ? 'testnet' : 'mainnet'

  if (!network) return null

  return (
    <div className={cn(styles.network, styles[networkName])}>
      <span className={styles.icon}>
        {!isTestnet ? <CheckCircleOutlined /> : <IssuesCloseOutlined />}
      </span>
      <span className={styles.text}>{networkName.toUpperCase()}</span>
    </div>
  )
}
