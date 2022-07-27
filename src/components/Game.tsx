import { useCallback, useEffect, useRef, useState } from 'react'
import { useReward } from 'react-rewards'
import { random } from 'utils/random'
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
  const { reward } = useReward('confettiId', 'confetti')

  const synthRef = useRef<SpeechSynthesis>(window.speechSynthesis)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const playRef = useRef<HTMLAudioElement | null>(null)

  const [match, setMatch] = useState<Match | null>(null)
  const [choices, setChoices] = useState<Choice[]>([])
  const [currentChoice, setCurrentChoice] = useState<Choice | null>(null)
  const [firstLangVoices, setFirstLangVoices] = useState<
    SpeechSynthesisVoice[] | null
  >(null)
  const [secondLangVoices, setSecondLangVoices] = useState<
    SpeechSynthesisVoice[] | null
  >(null)
  const [firstLangVoice, setFirstLangVoice] =
    useState<SpeechSynthesisVoice | null>(null)
  const [secondLangVoice, setSecondLangVoice] =
    useState<SpeechSynthesisVoice | null>(null)

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
      utter.voice =
        choice.lang === firstLang.code ? firstLangVoice : secondLangVoice
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
    [currentChoice, firstLang.code, firstLangVoice, isMatch, secondLangVoice]
  )

  const reset = useCallback(() => {
    setCurrentChoice(null)
    setMatch({})
  }, [])

  const playVoices = useCallback(() => {
    const voices = synthRef.current
      .getVoices()
      .filter(voice => !voice.name.includes('Google'))

    /* Get the first two values of the languages
     * like 'pt' instead of 'pt-BR'
     */
    const voicesA = voices.filter(
      voice => voice.lang.substring(0, 2) === firstLang.code
    )

    setFirstLangVoices(voicesA)
    setFirstLangVoice(random(voicesA))

    const voicesB = voices.filter(
      voice => voice.lang.substring(0, 2) === secondLang.code
    )

    setSecondLangVoices(voicesB)
    setSecondLangVoice(random(voicesB))
  }, [firstLang.code, secondLang.code])

  useEffect(() => {
    if (typeof window === 'undefined') return

    timeoutRef.current = setTimeout(() => playVoices(), 50)

    playRef.current = new Audio('/reward.mp3')

    if (match) {
      //Just to the length of the object
      const matchingValues = Object.entries(match)

      if (choices.length === matchingValues.length) {
        playRef.current.play()
        reward()
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [choices.length, match, playVoices, reward])

  useEffect(() => {
    if (typeof window === 'undefined' || !match) return
  }, [choices.length, match, reward])

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
    <section>
      <h2 className="mx-4 text-2xl font-bold">Choose your accent</h2>
      <div
        id="confettiId"
        className="my-2 grid grid-cols-1 space-y-4 lg:grid-cols-2"
      >
        <div>
          <h3 className="mx-4 text-xl">{firstLang.name}</h3>
          <ul className="flex flex-wrap p-2">
            {firstLangVoices?.map(voice => (
              <li key={`voice-${voice.name}-${voice.lang}`}>
                <SelectionButton
                  variant={
                    firstLangVoice?.name === voice.name ? 'selected' : 'primary'
                  }
                  onClick={() => setFirstLangVoice(voice)}
                  className="m-1"
                  label={voice.name}
                />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mx-4 text-xl">{secondLang.name}</h3>
          <ul className="flex flex-wrap p-2">
            {secondLangVoices?.map(voice => (
              <li key={`voice-${voice.name}-${voice.lang}`}>
                <SelectionButton
                  variant={
                    secondLangVoice?.name === voice.name
                      ? 'selected'
                      : 'primary'
                  }
                  onClick={() => setSecondLangVoice(voice)}
                  className="m-1"
                  label={voice.name}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="py-14 lg:py-24">
        <h2 className="mx-4 text-2xl font-bold">Choose the pairs</h2>
        <ul className="mr-2 flex flex-wrap">
          {choices.map(choice => (
            <li key={`${choice.lang}-${choice.value}`}>
              <SelectionButton
                disabled={match?.[choice.value]}
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

        <SelectionButton
          className="my-4"
          disabled={!currentChoice}
          label="Reset"
          onClick={reset}
          variant="reset"
        />
      </div>
    </section>
  )
}
