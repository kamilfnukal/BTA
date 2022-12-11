import { Icon } from 'react-feather'
import { BaseIconInput, BaseInputProps, InputLabel } from '../atoms'

type LabeledInputProps = BaseInputProps & {
  label: string
  Icon: Icon
}

export const LabeledInput: React.FC<LabeledInputProps> = ({ label, Icon, ...inputProps }) => {
  return (
    <div className="pt-4 flex flex-col lg:flex-row lg:items-center w-full">
      <InputLabel label={label} wrapperClasses="lg:w-1/4 mb-2 lg:mb-0" />
      <BaseIconInput Icon={Icon} extraWrapperClasses="grow" {...inputProps} />
    </div>
  )
}
