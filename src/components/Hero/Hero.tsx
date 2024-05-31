'use client'

import { FC, PropsWithChildren } from 'react'
import { Button } from 'antd'
import Link from 'next/link'
import styles from './Hero.module.scss'

type Props = {
  title?: string
  text?: string
  ctaText?: string
  ctaUrl?: string
  imageUrl?: string
  backgroundColor?: string
}
export const Hero: FC<PropsWithChildren<Props>> = ({
  title,
  text,
  ctaText,
  ctaUrl,
  imageUrl,
  backgroundColor,
  children,
}) => {
  const style = {
    background: backgroundColor,
  }
  return (
    <div className={styles.hero} style={style}>
      {imageUrl && <img src={imageUrl} className={styles.image} />}
      {(children || title) && (
        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.text}>{text}</p>
            {ctaText && ctaUrl && (
              <Link href={ctaUrl}>
                <Button shape="round" size="large">
                  {ctaText}
                </Button>
              </Link>
            )}
            {children && <div className={styles.children}>{children}</div>}
          </div>
        </div>
      )}
    </div>
  )
}
