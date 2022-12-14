import { Transition, Dialog } from '@headlessui/react'
import { Fragment } from 'react'

type CustomModalProps = {
  isOpen: boolean
  closeModal: () => void
  body: React.ReactNode
  action: React.ReactNode
}

const TransitionBackground = () => (
  <Transition.Child
    as={Fragment}
    enter="ease-out duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="ease-in duration-200"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <div className="fixed inset-0 bg-black bg-opacity-50" />
  </Transition.Child>
)

const MODAL_TRANSITION_PROPS = {
  as: Fragment,
  enter: 'ease-out duration-300',
  enterFrom: 'opacity-0 scale-95',
  enterTo: 'opacity-100 scale-100',
  leave: 'ease-in duration-200',
  leaveFrom: 'opacity-100 scale-100',
  leaveTo: 'opacity-0 scale-95'
}

export const CustomModal: React.FC<CustomModalProps> = ({ isOpen, closeModal, body, action }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionBackground />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child {...MODAL_TRANSITION_PROPS}>
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {body}
                <div className="flex justify-end w-full px-4">{action}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
