import { useSession } from 'next-auth/react'

const AccidentsHistoryModule: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  // TODO: create own useUser hook
  const { data } = useSession()

  return (
    <div>
      {isLoading ? (
        <h1 className="text-3xl">Loading</h1>
      ) : (
        <div>
          <h1 className="text-3xl">Accidents history module - Authenticated user</h1>
          <h2 className="text-xl">User - {data?.user?.name}</h2>
        </div>
      )}
    </div>
  )
}

export { AccidentsHistoryModule }