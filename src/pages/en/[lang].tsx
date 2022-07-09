import { Game, Header, Layout } from 'components'
import { Content, Langs } from 'data/langsData'
import { useResource } from 'lib/useResource'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const fetcher = async (lang: Langs) =>
  await (await fetch(`/api/pairs?lang=${lang}`)).json()

const Lang: NextPage = () => {
  const { query } = useRouter()
  const lang = query.lang as Langs

  const { data, isError, isLoading } = useResource<Content>(lang, () =>
    fetcher(lang)
  )

  if (!data || isLoading) return <p>Loading...</p>
  if (isError) return <p>Something went wrong</p>

  return (
    <Layout>
      <Header />

      <Game pairs={data.pairs} firstLang={data.langA} secondLang={data.langB} />
    </Layout>
  )
}

export default Lang
