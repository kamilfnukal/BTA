import clsx from 'clsx'

export const InputLabel: React.FC<{ label: string; wrapperClasses?: string }> = ({ label, wrapperClasses = '' }) => (
  <div className={clsx('whitespace-nowrap', wrapperClasses)}>
    <span className="text-xs xl:text-base px-4 py-2 bg-lighterpink text-blue-800 rounded-xl">{label}</span>
  </div>
)
