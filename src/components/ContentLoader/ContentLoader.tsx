import { Spin } from 'antd'
import styles from './ContentLoader.module.scss'

export const ContentLoader = () => {
  return (
    <div className={styles.loader}>
      <Spin />
    </div>
  )
}
