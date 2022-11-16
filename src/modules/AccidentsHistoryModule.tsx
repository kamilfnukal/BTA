import { useAuth } from '../hooks/auth'
import { BrnoBikeAccidentsResponse } from '../types/api'

type Props = {
  data: BrnoBikeAccidentsResponse
}

const AccidentsHistoryModule: React.FC<Props> = ({ data }) => {
  const { isLoading, user } = useAuth()

  console.log(data)
  return (
    <div>
      {isLoading ? (
        <h1 className="text-3xl">Loading</h1>
      ) : (
        <div>
          <h1 className="text-3xl">Accidents history module - Authenticated user</h1>
          <h2 className="text-xl">User - {user.name}</h2>
        </div>
      )}
    </div>
  )
}

export { AccidentsHistoryModule }
