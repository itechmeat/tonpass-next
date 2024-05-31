import { PropsWithChildren } from 'react'
import { setDebug } from '@tma.js/sdk-react'

// import { setDebug, useBackButton, useInitData, useSDK } from '@tma.js/sdk-react'

const TelegramProvider = ({ children }: PropsWithChildren) => {
  // https://docs.telegram-mini-apps.com/packages/tma-js-sdk/components/init-data

  setDebug(true)

  // const initData = useInitData()

  // const backButton = useBackButton()
  // backButton.hide()

  // if (!initResult)
  //   return (
  //     <main>
  //       <p>
  //         This is a Telegram Mini App, please{' '}
  //         <a href={process.env.NEXT_PUBLIC_TG_APP}>open it from Telegram</a>.
  //       </p>
  //       <p>
  //         <em>Loading SDK...</em>
  //       </p>
  //     </main>
  //   )

  return children
}

export default TelegramProvider;
