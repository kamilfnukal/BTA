import { Navigation } from 'react-feather'
import { Map, ZoomControl, MouseControl, SyncControl } from 'react-mapycz'
import { BaseIconInput } from '../components/atoms'

const MapyczMap = () => {
  return (
    <Map
      height="100%"
      loadingElement={<div className="bg-lighterpink w-full h-full">Loading map...</div>}
      center={{
        lat: 49.209,
        lng: 16.635
      }}
    >
      <ZoomControl />
      <MouseControl zoom={true} pan={true} wheel={true} />
      <SyncControl />
    </Map>
  )
}

type LabeledInputProps = {
  label: string
  placeholder: string
}

const LabeledInput: React.FC<LabeledInputProps> = ({ label, placeholder }) => {
  return (
    <div className="pt-4 flex flex-col lg:flex-row lg:items-center w-full">
      <div className="lg:w-1/4 mb-2 lg:mb-0">
        <span className="text-xs xl:text-base px-4 py-2 bg-lighterpink text-blue-800 rounded-xl">{label}</span>
      </div>
      <BaseIconInput placeholder={placeholder} Icon={Navigation} extraWrapperClasses="grow" />
    </div>
  )
}

const PlanTripModule: React.FC = () => {
  return (
    <div className="flex -mt-10 3xl:container 3xl:mx-auto w-full grow">
      <div className="w-5/12 flex flex-col px-10">
        <h1 className="text-5xl font-bold text-blue-800 pt-10 pb-20 whitespace-nowrap">Plan your next trip!</h1>

        {/* TODO: text */}
        <p>You need to type coordinates</p>

        <LabeledInput label="Start from" placeholder="Brno - Veveří" />
        <LabeledInput label="End of trip" placeholder="Brno - Botanická" />

        <div className="w-full flex justify-end mt-6">
          <button className="rounded shadow-lg bg-lighterblue/50 px-4 py-2 hover:bg-lighterblue">
            Show the best route!
          </button>
        </div>
      </div>

      <div className="grow">
        <MapyczMap />
      </div>
    </div>
  )
}

export { PlanTripModule }
