import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import '../styles/globals.css'
import { Session } from 'next-auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <title>Brno Bike Advisor</title>
        <meta name="title" content="Brno Bike Advisor"/>
        <meta name="description" content="We will tell you, when it's safe to ride a bike in Brno. Sign in and see, when and where will be the next bike accident. We know the future!"/>

        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://brnotransport.vercel.app/"/>
        <meta property="og:title" content="Brno Bike Advisor"/>
        <meta property="og:description" content="We will tell you, when it's safe to ride a bike in Brno. Sign in and see, when and where will be the next bike accident. We know the future!"/>
        <meta property="og:image" content="https://brnotransport.vercel.app/seo.png"/>

        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content="https://brnotransport.vercel.app/"/>
        <meta property="twitter:title" content="Brno Bike Advisor"/>
        <meta property="twitter:description" content="We will tell you, when it's safe to ride a bike in Brno. Sign in and see, when and where will be the next bike accident. We know the future!"/>
        <meta property="twitter:image" content="https://brnotransport.vercel.app/seo.png"/>
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  )
}

export default App
