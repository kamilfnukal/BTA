import { Navigation } from 'react-feather'
import { BaseIconInput } from '../components/atoms'
import { MapyczMap } from '../components/molecules'
import { END_AT_INPUT_ID, START_FROM_INPUT_ID } from '../const'

type LabeledInputProps = {
  id: string
  label: string
  placeholder: string
}

const LabeledInput: React.FC<LabeledInputProps> = ({ label, ...inputProps }) => {
  return (
    <div className="pt-4 flex flex-col lg:flex-row lg:items-center w-full">
      <div className="lg:w-1/4 mb-2 lg:mb-0">
        <span className="text-xs xl:text-base px-4 py-2 bg-lighterpink text-blue-800 rounded-xl">{label}</span>
      </div>
      <BaseIconInput Icon={Navigation} extraWrapperClasses="grow" {...inputProps} />
    </div>
  )
}

const PlanTripModule: React.FC = () => {
  return (
    <div className="flex -mt-10 3xl:container 3xl:mx-auto w-full grow">
      <div className="w-5/12 flex flex-col px-10">
        <h1 className="text-5xl font-bold text-blue-800 pt-10 pb-20 whitespace-nowrap">Plan your next trip!</h1>

        <LabeledInput label="Start from" placeholder="Brno - Veveří" id={START_FROM_INPUT_ID} />
        <LabeledInput label="End of trip" placeholder="Brno - Botanická" id={END_AT_INPUT_ID} />

        <div className="w-full flex justify-end mt-6">
          {/* TODO: to be removed since path is displayed dynamically */}
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
