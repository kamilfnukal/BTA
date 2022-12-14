import clsx from 'clsx'
import { PlanTripPageProps } from '../../types'
import { Button } from '../atoms'

type AccidentDetailLineProps = {
  title: string
  value: string
}

const AccidentDetailLine: React.FC<AccidentDetailLineProps> = ({ title, value }) => {
  return (
    <div className="flex items-center space-x-4 justify-between">
      <h3 className="text-lg text-black/50 whitespace-nowrap">{title}: </h3>
      <div className="px-3 py-[2px] bg-lighterpink rounded-lg">{value}</div>
    </div>
  )
}

type AccidentDetailProps = {
  accident: PlanTripPageProps['locationAccidents'][0][0]
  onClose?: () => void
  extraWrapperClasses?: string
}

export const AccidentDetail: React.FC<AccidentDetailProps> = ({ accident, onClose, extraWrapperClasses = '' }) => {
  const date = new Date(0)
  date.setMilliseconds(accident.datum)

  return (
    <div className={clsx('py-6 px-4 my-4 rounded flex flex-col space-y-3 justify-center', extraWrapperClasses)}>
      <div className="flex space-x-2 items-center mb-2 border-b border-b-blue-800/50 pb-2">
        <h2 className="text-black/50">Detail nehody ze dne</h2>
        <div className="grow text-xl">{date.toLocaleDateString()}</div>
        {onClose && (
          <Button
            label="Zavřít"
            onClick={onClose}
            extraClasses="min-h-0 py-3 h-auto text-xs bg-lightblue text-black border-none shadow hover:bg-lighterblue"
          />
        )}
      </div>

      <AccidentDetailLine title="Místo" value={accident.nazev} />
      <AccidentDetailLine title="Následky" value={accident.nasledek} />
      <AccidentDetailLine title="Srážka" value={accident.srazka} />
      <AccidentDetailLine title="Věková skupina" value={accident.vek_skupina} />
      <AccidentDetailLine title="Zavinění" value={accident.zavineni} />
      <AccidentDetailLine title="Viditelnost" value={accident.viditelnost} />
      <AccidentDetailLine title="Alkohol" value={accident.alkohol} />
      <AccidentDetailLine title="Stav řidiče" value={accident.stav_ridic} />
    </div>
  )
}
