import clsx from 'clsx'
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { Icon } from 'react-feather'

type BaseInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  extraInputClasses?: string
  extraWrapperClasses?: string
  Icon: Icon
  note?: React.ReactNode
  id: string
}

const BaseIconInput: React.FC<BaseInputProps> = ({
  extraInputClasses = '',
  extraWrapperClasses = '',
  Icon,
  note,
  ...inputProps
}) => {
  return (
    <div className={clsx('relative', extraWrapperClasses)}>
      <div className="absolute top-3.5 left-5">
        <Icon size={16} />
      </div>
      <input
        {...inputProps}
        type="text"
        className={clsx(
          'w-full py-2 pl-12 pr-2 border-2 border-gray-200 rounded-lg bg-white shadow appearance-none focus-visible:outline-none',
          extraInputClasses
        )}
      />
      {note && <div className="absolute -bottom-5 right-2 text-gray-400 text-xs">{note}</div>}
    </div>
  )
}

export { BaseIconInput }
