import type { NextPage } from 'next'
import Head from 'next/head'
import Hero from '@/components/about/Hero'
import Story from '@/components/about/Story'
import Mission from '@/components/about/Mission'
import Gallery from '@/components/about/Gallery'

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About Us - Oyster Kode Club</title>
        <meta
          name="description"
          content="Learn about Oyster Kode Club's mission, story, and team members."
        />
      </Head>

      <main>
        <Hero />
        <Story />
        <Mission />
        <Gallery />
      </main>
    </>
  )
}

export default About 