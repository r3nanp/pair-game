import { Game, Header, Layout } from 'components'
import { NextPage } from 'next'

const Lang: NextPage = () => {
  return (
    <Layout>
      <Header />

      <Game
        pairs={[]}
        firstLang={{
          code: 'en',
          name: 'Spanish'
        }}
        secondLang={{
          code: 'en',
          name: 'Spanish'
        }}
      />
    </Layout>
  )
}

export default Lang
