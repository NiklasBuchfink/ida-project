import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import PlayerProvider from "../components/PlayerContext";

export default function MyApp({
  Component, 
  pageProps: { session, ...pageProps }
}) {
  return (
  <SessionProvider session={session}>
    <PlayerProvider>
      <Component {...pageProps} />
    </PlayerProvider>
  </SessionProvider>
  )
}
