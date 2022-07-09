type Pair = {
  lang: string
  value: string
}

type Lang = {
  code: string
  name: string
}

type GameProps = {
  pairs: Pair[]
  firstLang: Lang
  secondLang: Lang
}

export const Game = ({ pairs = [], firstLang, secondLang }: GameProps) => {
  return (
    <>
      <h2 className="mx-4">Choose your accent</h2>
      <div className="flex"></div>

      <h2 className="mx-4">Choose the pairs</h2>
    </>
  )
}
