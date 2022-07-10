import { useCallback, useEffect, useRef, useState } from 'react'
import { SelectionButton } from './SelectionButton'

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

type Match = Record<string, boolean>

export const Game = ({ pairs = [], firstLang, secondLang }: GameProps) => {
  const synthRef = useRef<SpeechSynthesis>(window.speechSynthesis)

  const [choices, setChoices] = useState<Choice[]>([])
  const [currentChoice, setCurrentChoice] = useState<Choice | null>(null)
  const [match, setMatch] = useState<Match>({})

  const isMatch = useCallback(
    (firstValue: string, secondValue: string) =>
      pairs.some(
        ([firstPair, secondPair]) =>
          (firstPair === firstValue && secondPair === secondValue) ||
          (firstPair === secondValue && secondPair === firstValue)
      ),
    [pairs]
  )

  const choose = useCallback(
    (choice: Choice) => {
      if (typeof window === 'undefined') return

      const utter = new SpeechSynthesisUtterance(choice.value)

      synthRef.current.speak(utter)

      if (!currentChoice) {
        setCurrentChoice(choice)
        setMatch(state => ({ ...state, [choice.value]: true }))
      }

      if (currentChoice) {
        if (isMatch(currentChoice.value, choice.value)) {
          setMatch(state => ({ ...state, [choice.value]: true }))
        } else {
          setMatch(state => ({ ...state, [currentChoice.value]: false }))
        }

        setCurrentChoice(null)
      }
    },
    [currentChoice, isMatch]
  )

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

    const sortedPairs = allPairs.sort(() => Math.random() - 0.5)

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
      <ul className="mr-2 flex flex-wrap">
        {choices.map(choice => (
          <li key={`${choice.lang}-${choice.value}`}>
            <SelectionButton
              disabled={match[choice.value]}
              variant={
                currentChoice && currentChoice.value === choice.value
                  ? 'selected'
                  : 'primary'
              }
              onClick={() => choose(choice)}
              className="m-1"
              label={choice.value}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
