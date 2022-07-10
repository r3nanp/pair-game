import { Game, Header, Layout, Spinner } from 'components'
import { Content, Langs } from 'data/langsData'
import { useResource } from 'lib/useResource'
import { NextPage } from 'next'
import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/router'

const fetcher = async (lang: Langs) =>
  await (await fetch(`/api/pairs?lang=${lang}`)).json()

const Lang: NextPage = () => {
  const { query } = useRouter()
  const lang = query.lang as Langs

  const { data, isError, isLoading } = useResource<Content>(lang, () =>
    fetcher(lang)
  )

  if (!data || isLoading) return <Spinner centered size="lg" color="white" />
  if (isError) return <p className="white">Something went wrong :(</p>

  return (
    <Layout>
      <DefaultSeo
        title={`Pair game - ${lang}`}
        description={`Learning ${lang}`}
      />

      <Header />

      <Game pairs={data.pairs} firstLang={data.langA} secondLang={data.langB} />
    </Layout>
  )
}

export default Lang
