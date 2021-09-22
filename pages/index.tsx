import type { NextPage } from 'next'
import { Session } from 'next-auth'
import { getSession, GetSessionOptions } from 'next-auth/client'
import Head from 'next/head'
import Header from '../components/Header'
import Login from '../components/Login'

interface HomePageProps {
  session: Session|null
}

const Home: NextPage<HomePageProps> = ({session}) => {
  if (!session) return <Login />

  return (
    <div>
      <Head>
        <title>Facebook Clone</title>
      </Head>

      <Header />

      <main>
        {/* Sidebar */}
        {/* Feed */}
        {/* Widgets */}
      </main>
    </div>
  )
}
export async function getServerSideProps(context: GetSessionOptions){
  // Get the user
  const session = await getSession(context);
  return {
    props: {
      session
    }
  }
}

export default Home
