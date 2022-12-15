import React, { useMemo, useState } from 'react'
import { BrnoBikeAccidentsResponse } from '../types/api'

import { CustomTransition } from '../components/atoms'
import { filterAccidents } from '../utils'
import { AccidentCard, Table, TableToolbar } from '../components/organisms'
import { Formik, useFormikContext } from 'formik'

type Props = {
  data: BrnoBikeAccidentsResponse
}

const INITIAL_VALUES: {
  query: string
  week: number | null
  day: Date | null
} = {
  query: '',
  week: 1,
  day: null
}

const AccidentCardsSection: React.FC<{ accidents: BrnoBikeAccidentsResponse }> = ({ accidents }) => {
  const {
    values: { query }
  } = useFormikContext<typeof INITIAL_VALUES>()

  const queriedAccidents = useMemo(() => {
    if (query.length < 3) return []

    return filterAccidents(accidents, query).slice(0, 6)
  }, [query])

  return (
    <div className="flex gap-y-4 flex-wrap w-full -ml-4">
      {queriedAccidents.map((accident) => (
        <AccidentCard accident={accident} />
      ))}
    </div>
  )
}

const AccidentsHistoryModule: React.FC<Props> = ({ data }) => {
  const [showTable, setShowTable] = useState(true)

  return (
    <div className="container mx-auto px-10">
      <Formik initialValues={INITIAL_VALUES} onSubmit={() => undefined}>
        {({ values: { query, week }, setFieldValue }) => (
          <>
            <TableToolbar accidents={data} setFieldValue={setFieldValue} week={week} />
            <CustomTransition show={query.length > 2 && !showTable} afterLeave={() => setShowTable((v) => !v)}>
              <AccidentCardsSection accidents={data} />
            </CustomTransition>
            <CustomTransition show={query.length < 3 && showTable} afterLeave={() => setShowTable((v) => !v)}>
              <Table accidents={data} />
            </CustomTransition>
          </>
        )}
      </Formik>
    </div>
  )
}

export { AccidentsHistoryModule }
