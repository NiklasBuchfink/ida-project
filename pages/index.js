import Head from 'next/head'
import Layout from '../components/Layout'
import Login from '../components/Login'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="A Taste of Music" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1 className="text-3xl m-4">
          Hello Spotify!
        </h1>
        <div className="m-4">
          <Login />
        </div>
      </Layout>
    </div>
  )
}
