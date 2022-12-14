import { Listbox, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { useFormikContext } from 'formik'
import { Fragment } from 'react'
import { ChevronDown } from 'react-feather'

type BaseSelectProps<T, K> = {
  options: T[]
  fieldName: keyof K
  getValue?: () => string
  extraButtonClasses?: string
}

export const BaseSelect = <T extends { id: string | number; name: string }, K extends { [key: string]: string }>({
  fieldName,
  options,
  getValue,
  extraButtonClasses = ''
}: BaseSelectProps<T, K>) => {
  const { values, setFieldValue } = useFormikContext<K>()

  return (
    <Listbox value={values[fieldName]} onChange={(locationId) => setFieldValue(fieldName as string, locationId)}>
      <div className="relative">
        <Listbox.Button
          className={clsx(
            'py-2 pr-12 pl-4 border-2 border-gray-200 rounded-lg bg-white shadow appearance-none focus-visible:outline-none relative',
            extraButtonClasses
          )}
        >
          <span className="block truncate text-left">{getValue ? getValue() : values[fieldName]}</span>
          <span className="absolute top-3 right-2">
            <ChevronDown size={18} />
          </span>
        </Listbox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((location) => (
              <Listbox.Option
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 px-5 ${
                    active ? 'mx-2 px-3 rounded bg-lightpurple/50' : 'text-gray-900'
                  }`
                }
                value={location.id}
              >
                {location.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
