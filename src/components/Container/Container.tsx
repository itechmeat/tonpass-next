import { PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './Container.module.scss'

type Props = {
  className?: string
}
export const Container  = ({ children, className }: PropsWithChildren<Props>) => {
  return <div className={cn(styles.container, className)}>{children}</div>
}
