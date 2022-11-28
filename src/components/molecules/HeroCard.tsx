import { signIn } from 'next-auth/react'
import { Button } from '../atoms/Button'

type HeroCardProps = {
  header: string
  firstParagraph: string
  secondParagraph: string
}

const HeroCard: React.FC<HeroCardProps> = ({ header, firstParagraph, secondParagraph }) => {
  return (
    <div className="card card-compact max-w-[384px] bg-base-100 shadow-xl">
      <figure>
        <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{header}</h2>
        <p>{firstParagraph}</p>
        <p>{secondParagraph}</p>
        <div className="card-actions justify-end mt-4 mb-2">
          <Button
            extraClasses="bg-blue-800 border-none hover:bg-lighterblue hover:text-blue-800"
            onClick={() => signIn('google')}
            label="Sign in!"
          />
        </div>
      </div>
    </div>
  )
}

export { HeroCard }
