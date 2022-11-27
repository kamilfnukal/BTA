import { Map, ZoomControl, MouseControl, SyncControl } from 'react-mapycz'

const PlanTripModule: React.FC = () => {
  return (
    <div className="flex -mt-10">
      <h1 className="text-3xl">Plan trip module - Authenticated user</h1>
      <Map
        height="90vh"
        loadingElement={<div className="bg-lighterpink w-full h-[90vh]">Loading map...</div>}
        center={{
          lat: 49.209,
          lng: 16.635
        }}
      >
        <ZoomControl />
        <MouseControl zoom={true} pan={true} wheel={true} />
        <SyncControl />
      </Map>
    </div>
  )
}

export { PlanTripModule }
