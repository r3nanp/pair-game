import { Header, Layout } from 'components'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>usePairs - This is not a React hook</title>
        <meta
          name="description"
          content="If you want to learn a new language, this is the place!"
        />
        <meta name="keywords" content="languages, app, learning, pairs" />
        <meta name="author" content="r3nanp" />
      </Head>

      <Header />

      <ul className="grid grid-cols-1 grid-rows-1 place-items-center md:grid-cols-2">
        <li className="px-1 py-1">
          <Link href="/en/[lang]" as="/en/es">
            <a className="text-main">
              Practice <strong>Spanish</strong>
            </a>
          </Link>
        </li>

        <li className="px-1 py-1">
          <Link href="/en/[lang]" as="/en/fr">
            <a className="text-main">
              Practice <strong>English</strong>
            </a>
          </Link>
        </li>
      </ul>
    </Layout>
  )
}

export default Home
