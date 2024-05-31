import '../styles/main.scss'
import dynamic from 'next/dynamic';
const MainLayout = dynamic(() => import('@/components/layouts/MainLayout'));


export default function RootLayout({ children }) {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  )
}
