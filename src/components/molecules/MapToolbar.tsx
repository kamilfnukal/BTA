import { useFormikContext } from 'formik'
import { useMemo } from 'react'

import { YEARS } from '../../const'
import { useUserLocations } from '../../hooks/location'
import { Location } from '../../utils/firebase'
import { BaseSelect } from '../atoms'

type MapToolbarProps = {
  allLocations: Location[]
}

export const MapToolbar: React.FC<MapToolbarProps> = ({ allLocations }) => {
  const { values } = useFormikContext<{ location: string; year: number }>()
  const { data: preferredLocations } = useUserLocations()

  const locationOptions = useMemo(() => {
    if (!preferredLocations) return allLocations.map((l) => ({ ...l, note: '' }))

    return allLocations
      .map((l) => ({
        ...l,
        note: preferredLocations.find((pl) => pl.location.id === l.id)?.note ?? ''
      }))
      .sort((a, b) => (a.note ? -1 : b.note ? 1 : 0))
  }, [preferredLocations])

  return (
    <div className="absolute z-10 top-3 left-6 bg-lightblue p-4 rounded-lg shadow-2xl border border-lighterblue flex space-x-4">
      <div className="w-5/12">
        <BaseSelect fieldName="year" options={YEARS.map((y) => ({ id: y, name: y.toString() }))} />
      </div>

      <div className="grow">
        <BaseSelect
          fieldName="location"
          getValue={() =>
            allLocations.find((l) => l.id === values.location)?.name ?? (
              <span className="text-black/50">All locations</span>
            )
          }
          customOption={(option) => (
            <div className="flex items-center justify-between group">
              <div>{option.name}</div>
              {option.note && (
                <div className="shadow-lg items-center space-x-1 group-hover:flex bg-lighterpink px-2 py-1 rounded-lg text-xs">
                  <span>{option.note}</span>
                </div>
              )}
            </div>
          )}
          options={locationOptions}
          extraButtonClasses="w-72"
        />
      </div>
    </div>
  )
}
