import { Transition } from '@headlessui/react'
import { PropsWithChildren } from 'react'

type TransitionProps = PropsWithChildren<{
  show: boolean
  afterLeave: () => void
}>

const CustomTransition: React.FC<TransitionProps> = ({ show, afterLeave, children }) => {
  return (
    <Transition
      show={show}
      afterLeave={afterLeave}
      enter="transition-opacity duration-125"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-125"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  )
}

export { CustomTransition }
