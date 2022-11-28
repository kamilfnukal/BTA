import { Transition } from '@headlessui/react'
import { PropsWithChildren } from 'react'

type TransitionProps = PropsWithChildren<{
  show: boolean
  afterLeave: any
}>

const CustomTransition: React.FC<TransitionProps> = (props) => {
  return (
    <Transition
      show={props.show}
      afterLeave={props.afterLeave}
      enter="transition-opacity duration-125"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-125"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {props.children}
    </Transition>
  )
}

export { CustomTransition }
