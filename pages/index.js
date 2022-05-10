import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import { useSession } from "next-auth/react";

export default function Home() {
  const { status } = useSession();

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
          {status === "authenticated"
            ? (
              <Link href="/app">
              <div className="bg-red-500 text-white px-4 py-2 rounded-md w-fit">
                See my results
              </div>
            </Link>
            ) : (
              <Link href="/login">
                <div className="bg-green-500 text-white px-4 py-2 rounded-md w-fit">
                  Login
                </div>
              </Link>
            )
          }
        </div>
      </Layout>
    </div>
  )
}
