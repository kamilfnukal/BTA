import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { PlanTripPageProps } from '../../types'
import { BrnoBikeAccidentsResponse } from '../../types/api'
import { Button } from '../atoms'
import { AccidentDetail, CustomModal } from '../molecules'

type AccidentDetailModalProps = {
  accident: BrnoBikeAccidentsResponse[0]['attributes']
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
