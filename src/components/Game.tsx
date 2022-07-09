import { useEffect, useState } from 'react'

type Lang = {
  code: string
  name: string
}

type Choice = {
  lang: string
  value: string
}

type GameProps = {
  pairs: string[][]
  firstLang: Lang
  secondLang: Lang
}

export const Game = ({ pairs = [], firstLang, secondLang }: GameProps) => {
  const [choices, setChoices] = useState<Choice[]>([])

  useEffect(() => {
    const allPairs = pairs.flatMap(([pairA, pairB]) => [
      {
        lang: firstLang.code,
        value: pairA
      },
      {
        lang: secondLang.code,
        value: pairB
      }
    ])

    const sortedPairs = allPairs.sort(() => Math.random() * 0.5)

    setChoices(sortedPairs)
  }, [firstLang.code, pairs, secondLang.code])

  return (
    <>
      <h2 className="mx-4">Choose your accent</h2>
      <div className="flex">
        <ul className="flex flex-wrap p-2"></ul>
        <ul className="flex flex-wrap p-2"></ul>
      </div>

      <h2 className="mx-4">Choose the pairs</h2>
      <ul className="mr-2 flex flex-wrap"></ul>
    </>
  )
}
