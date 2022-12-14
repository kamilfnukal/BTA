import { PlanTripPageProps } from '../../types'

type AccidentDetailLineProps = {
  title: string
  value: string
}

const AccidentDetailLine: React.FC<AccidentDetailLineProps> = ({ title, value }) => {
  return (
    <div className="flex items-center space-x-4 justify-between">
      <h3 className="text-lg text-black/50 whitespace-nowrap">{title}: </h3>
      <div className="px-3 py-[2px] bg-lighterpink rounded">{value}</div>
    </div>
  )
}

type AccidentDetailProps = {
  accident: PlanTripPageProps['locationAccidents'][0][0]
}

export const AccidentDetail: React.FC<AccidentDetailProps> = ({ accident }) => {
  const date = new Date(0)
  date.setMilliseconds(accident.datum)

  return (
    <div className="shadow-md border border-lighterblue my-8 p-4 rounded flex flex-col space-y-3 justify-center">
      <div className="flex space-x-2 items-baseline mb-2 border-b border-b-blue-800/50 pb-2">
        <h2 className="text-black/50">Detail nehody ze dne</h2>
        <div className="text-xl">{date.toLocaleDateString()}</div>
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
