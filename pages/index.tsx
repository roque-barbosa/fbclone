import type { NextPage } from 'next'
import { Session } from 'next-auth'
import { getSession, GetSessionOptions } from 'next-auth/client'
import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header'
import Login from '../components/Login'
import Sidebar from '../components/Sidebar'

interface HomePageProps {
  session: Session|null
}

const Home: NextPage<HomePageProps> = ({session}) => {
  if (!session) return <Login />

  return (
    <div className='
      h-screen
      bg-gray-100
      overflow-hidden
    '>
      <Head>
        <title>Facebook Clone</title>
      </Head>

      <Header />

      <main className="flex">
        {/* Sidebar */}
        <Sidebar/>
        {/* Feed */}
        <Feed />
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
