import { FC, PropsWithChildren } from 'react'
import { Container } from '@/components/Container/Container'
import styles from './Footer.module.scss'

export const Footer: FC<PropsWithChildren> = () => {
  return (
    <footer className={styles.footer}>
      <Container className={styles.wrapper}>
        <div className={styles.copyright}>
          Made with <span className={styles.heart}>❤</span> by{' '}
          <a href="https://t.me/techmeat" target="_blank" className={styles.author}>
            @techmeat
          </a>
          <span> </span>&<span> </span>
          <a href="https://t.me/andr_ewtf" target="_blank" className={styles.author}>
            @andr_ewtf
          </a>
        </div>
      </Container>
    </footer>
  )
}
