import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { PlanTripPageProps } from '../../types'
import { Button } from '../atoms'
import { AccidentDetail, CustomModal } from '../molecules'

type AccidentDetailModalProps = {
  accident: PlanTripPageProps['locationAccidents'][0][0]
  isOpen: boolean
  closeModal: () => void
}

export const AccidentDetailModal: React.FC<AccidentDetailModalProps> = ({ accident, isOpen, closeModal }) => {
  return (
    <CustomModal
      isOpen={isOpen}
      closeModal={closeModal}
      body={<AccidentDetail accident={accident} extraWrapperClasses="" />}
      action={
        <Button
          extraClasses="bg-lighterblue text-blue-800 font-semibold border-none hover:bg-lightblue"
          onClick={closeModal}
          label="Zavřít"
        />
      }
    />
  )
}
