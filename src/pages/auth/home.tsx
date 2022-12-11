import { GetStaticProps, NextPage } from 'next'
import { useEffect } from 'react'
import { getHomeData } from '../../hooks/weather'
import { HomeModule, ProtectedModule } from '../../modules'
import { HomePageProps } from '../../types'

// TODO: useEffect that checks if needing revalidate (current rendered day stored in firestore)
const HomePage: NextPage<HomePageProps> = (props) => {
  // TODO: extract this useEffect to src/hooks
  useEffect(() => {
    // TODO:
    // Fetch from firestoreDB, when was home page last time revalidated
    // if today, do not do anything
    // if `before today`, we need to revalidate it by calling
    // `fetch(`/api/revalidate?page=home&secret=${process.env.NEXT_PUBLIC_SECRET}`)`
  }, [])

  return (
    <ProtectedModule>
      <HomeModule {...props} />
    </ProtectedModule>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: await getHomeData()
  }
}

export default HomePage
