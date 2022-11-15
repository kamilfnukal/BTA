import { Button } from '../components/atoms'

export default function Home() {
  return (
    <div className="text-red-700">
      <Button label="Label" onClick={() => console.log('A')} />
    </div>
  )
}
