

import { Inter } from 'next/font/google';
import '../globals.css';

import TopBar from '@/Components/shared/TopBar';
import BottomBar from '@/Components/shared/BottomBar';
import LeftSidebar from '@/Components/shared/LeftSidebar';
import RightSidebar from '@/Components/shared/RightSidebar';

import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Threads',
  description: 'A Next.js 13 Meta Threads Application'
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ClerkProvider>
        <TopBar />
        <main className='flex flex-row'>
          <LeftSidebar />
          <section className='main-container'>
            <div className='w-full max-w-4xl'>
              {children}
            </div>
          </section>
          <RightSidebar />
        </main>
        <BottomBar />
        </ClerkProvider>
      </body>
    </html>
  )
}
