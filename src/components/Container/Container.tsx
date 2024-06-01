import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './Container.module.scss'

type Props = {
  className?: string
  isLight?: boolean
}
export const Container: FC<PropsWithChildren<Props>> = ({ children, className, isLight }) => {
  return (
    <div className={cn(styles.container, { [styles.light]: isLight }, className)}>{children}</div>
  )
}
