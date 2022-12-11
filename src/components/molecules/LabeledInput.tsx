import { Icon } from 'react-feather'
import { BaseIconInput } from '../atoms'

type LabeledInputProps = {
  id: string
  label: string
  placeholder: string
  Icon: Icon
}

export const LabeledInput: React.FC<LabeledInputProps> = ({ label, Icon, ...inputProps }) => {
  return (
    <div className="pt-4 flex flex-col lg:flex-row lg:items-center w-full">
      <div className="lg:w-1/4 mb-2 lg:mb-0">
        <span className="text-xs xl:text-base px-4 py-2 bg-lighterpink text-blue-800 rounded-xl">{label}</span>
      </div>
      <BaseIconInput Icon={Icon} extraWrapperClasses="grow" {...inputProps} />
    </div>
  )
}
