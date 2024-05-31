'use client'

import { PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './Heading.module.scss'

type Props = {
  title?: string
  actions?: ReactNode
  className?: string
  isCentered?: boolean
}
export const Heading = ({
  className,
  title,
  children,
  actions,
  isCentered,
}: PropsWithChildren<Props>) => {
  return (
    <header className={cn(styles.header, { [styles.centered]: isCentered }, className)}>
      <h1 className={styles.h1}>{title || children}</h1>
      {actions}
    </header>
  )
}
