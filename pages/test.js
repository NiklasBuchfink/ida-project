import Head from 'next/head'
import Layout from '../components/Layout'

export default function Test() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Test Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1 className="text-3xl underline">
          Hello Test!
        </h1>
      </Layout>
    </div>
  )
}