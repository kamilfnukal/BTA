import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { PlanTripPageProps } from '../../types'
import { Button } from '../atoms'
import { AccidentDetail } from '../molecules'

type AccidentDetailModalProps = {
  accident: PlanTripPageProps['locationAccidents'][0][0]
  isOpen: boolean
  closeModal: () => void
}

export const AccidentDetailModal: React.FC<AccidentDetailModalProps> = ({ accident, isOpen, closeModal }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <AccidentDetail accident={accident} extraWrapperClasses="" />
                <div className="flex justify-end w-full px-4">
                  <Button
                    extraClasses="bg-lighterblue text-blue-800 font-semibold border-none hover:bg-lightblue"
                    onClick={closeModal}
                    label="Zavřít"
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
