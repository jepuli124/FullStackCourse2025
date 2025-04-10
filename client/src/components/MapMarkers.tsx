import React from 'react'
import '../css/marker.css';
import IMarker from '../interfaces/IMarker';
import MapMarker from './MapMarker';

interface incomingParams {
    markers?: IMarker[]
}


const MapMarkers: React.FC<incomingParams> = ({markers}) => {
  console.log(markers)
  return (
    <div>
      {markers ? markers?.length > 0 ? markers.map((marker) => (
        <div key={marker._id}>
          <MapMarker marker={marker} />
      </div>
      )) : <></> : <></> }
      
    </div>
  )
}

export default MapMarkers