import { useFormikContext } from 'formik'

import { YEARS } from '../../const'
import { Location } from '../../utils/firebase'
import { BaseSelect } from '../atoms'

type MapToolbarProps = {
  allLocations: Location[]
}

export const MapToolbar: React.FC<MapToolbarProps> = ({ allLocations }) => {
  const { values } = useFormikContext<{ location: string; year: number }>()

  return (
    <div className="absolute z-10 top-3 left-6 bg-lightblue p-4 rounded-lg shadow-2xl border border-lighterblue flex space-x-4">
      <div className="w-5/12">
        <BaseSelect fieldName="year" options={YEARS.map((y) => ({ id: y, name: y.toString() }))} />
      </div>

      <div className="grow">
        <BaseSelect
          fieldName="location"
          getValue={() => allLocations.find((l) => l.id === values.location)?.name ?? 'All locations'}
          options={allLocations}
          extraButtonClasses="w-72"
        />
      </div>
    </div>
  )
}
