import { useCallback, useState } from 'react'
import { BrnoBikeAccidentsResponse } from '../../types/api'
import { Button } from '../atoms'
import { AccidentDetail, CustomModal } from '../molecules'

type AccidentDetailModalProps = {
  accident: BrnoBikeAccidentsResponse[0]['attributes']
  isOpen: boolean
  closeModal: () => void
}

const AccidentDetailModal: React.FC<AccidentDetailModalProps> = ({ accident, isOpen, closeModal }) => {
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

export const WithAccidentModal: React.FC<{
  accident: BrnoBikeAccidentsResponse[0]['attributes']
  children: (onModalOpen: () => void) => React.ReactNode
}> = ({ children, accident }) => {
  const [isAccidentOpened, setIsAccidentOpened] = useState(false)

  const onModalOpen = useCallback(() => setIsAccidentOpened(true), [])

  return (
    <>
      {children(onModalOpen)}
      <AccidentDetailModal
        accident={accident}
        isOpen={isAccidentOpened}
        closeModal={() => setIsAccidentOpened(false)}
      />
    </>
  )
}
