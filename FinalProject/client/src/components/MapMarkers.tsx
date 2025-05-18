import React from 'react'
import '../css/marker.css';
import IMarker from '../interfaces/IMarker';
import MapMarker from './MapMarker';

interface incomingParams {
    markers?: IMarker[]
    markerClicked?: (e: React.MouseEvent, marker: IMarker) => void
}


const MapMarkers: React.FC<incomingParams> = ({markers, markerClicked}) => {
  return (
    <div>
      {markers ? markers?.length > 0 ? markers.map((marker) => (
        <div key={marker._id} onClick={(e: React.MouseEvent) => {if(markerClicked) markerClicked(e, marker)}}>
          <MapMarker marker={marker} />
      </div>
      )) : <></> : <></> }
      
    </div>
  )
}

export default MapMarkers