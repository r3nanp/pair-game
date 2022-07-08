import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <main className="mx-auto max-w-3xl">
      <Head>
        <title>usePairs - This is not a React hook</title>
        <meta
          name="description"
          content="If you want to learn a new language, this is the place!"
        />
        <meta name="keywords" content="languages, app, learning, pairs" />
        <meta name="author" content="r3nanp" />
      </Head>

      <header className="py-4">
        <h1 className="text-4xl">
          <Link href="/">
            <a className="flex items-center justify-center">
              usePairs(
              <Image
                src="/bird.png"
                alt="Illustration of a bird"
                width={50}
                height={50}
              />
              )
            </a>
          </Link>
        </h1>
      </header>

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
    </main>
  )
}

export default Home
