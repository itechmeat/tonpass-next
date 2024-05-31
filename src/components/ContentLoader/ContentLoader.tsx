import { FC, PropsWithChildren } from 'react'
import { Spin } from 'antd'
import styles from './ContentLoader.module.scss'

export const ContentLoader: FC<PropsWithChildren> = () => {
  return (
    <div className={styles.loader}>
      <Spin />
    </div>
  )
}
