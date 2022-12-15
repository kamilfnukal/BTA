import Image from 'next/image'
import { Calendar, ArrowRight } from 'react-feather'
import { BrnoBikeAccidentsResponse } from '../../types/api'
import { WithAccidentModal } from './WithAccidentModal'
import DUMMY_BIKE from '/public/Blue-bike.svg'

type AccidentCardProps = {
  accident: BrnoBikeAccidentsResponse[0]
}

export const AccidentCard: React.FC<AccidentCardProps> = ({ accident: { attributes } }) => {
  const accidentDate = new Date(0)
  accidentDate.setMilliseconds(attributes.datum)

  return (
    <WithAccidentModal accident={attributes}>
      {(onModalOpen) => (
        <div className="w-1/3 h-ful flex flex-col">
          <div className="mx-4 shadow-lg p-6 rounded-lg grow">
            <div className="flex space-x-4">
              <Image src={DUMMY_BIKE} width={54} alt="Shoes" />
              <div>
                <h2 className="font-bold text-blue-800 text-lg">{attributes.nazev}</h2>
                <div className="flex items-center space-x-2 text-black/50">
                  <Calendar size={14} />
                  <div className="text-sm font-light">{accidentDate.toLocaleDateString()}</div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between items-center text-blue-800">
              <h3 className="text-lg font-semibold pl-2">Příčina</h3>
              <div className="flex space-x-2 items-center rounded-lg px-2 py-1 hover:shadow hover:cursor-pointer">
                <button onClick={onModalOpen} className="">
                  See more
                </button>
                <ArrowRight size={14} />
              </div>
            </div>
            <div className="mt-2 pl-2 rounded-lg text-black bg-lighterblue px-4 py-2">{attributes.pricina}</div>
          </div>
        </div>
      )}
    </WithAccidentModal>
  )
}
