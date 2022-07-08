import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  return (
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
  )
}
