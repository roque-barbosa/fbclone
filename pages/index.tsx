import type { NextPage } from 'next'
import { Session } from 'next-auth'
import { getSession, GetSessionOptions } from 'next-auth/client'
import Head from 'next/head'
import Feed from '../components/Feed/Feed'
import Header from '../components/Header/Header'
import Login from '../components/Login/Login'
import Sidebar from '../components/Sidebar/Sidebar'
import Widgets from '../components/Widgets/Widgets'
import { db } from '../firebase'
import {collection, query, onSnapshot, orderBy, getDocs} from "firebase/firestore"

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
        <Widgets />
      </main>
    </div>
  )
}
export async function getServerSideProps(context: GetSessionOptions){
  // Get the user
  const session = await getSession(context);

  const collectionRef  = collection(db, 'posts')
  const q = query(collectionRef, orderBy('timestamp', 'desc'));

  const posts = await getDocs(q)

  const docs = posts.docs.map((post) => ({
    id: post.id,
    ...post.data,
    timestamp: null
  }));

  return {
    props: {
      session,
      posts: docs,
    }
  }
}

export default Home
