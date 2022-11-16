import { useAuth } from '../hooks/auth'

const ReportAccidentModule: React.FC = () => {
  const { isLoading, user } = useAuth()

  return (
    <div>
      {isLoading ? (
        <h1 className="text-3xl">Loading</h1>
      ) : (
        <div>
          <h1 className="text-3xl">Report accident module - Authenticated user</h1>
          <h2 className="text-xl">User - {user.name}</h2>
        </div>
      )}
    </div>
  )
}

export { ReportAccidentModule }
