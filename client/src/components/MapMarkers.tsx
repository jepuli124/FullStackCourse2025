import React from 'react'
import { KeepScale } from 'react-zoom-pan-pinch'
import '../css/marker.css';
import IMarker from '../interfaces/IMarker';

interface incomingParams {
    markers?: IMarker[]
}


const MapMarkers: React.FC<incomingParams> = ({markers}) => {

  return (
    <div>
      {markers ? markers.map((marker) => (
        <div
        style={{ // from https://github.com/BetterTyped/react-zoom-pan-pinch/blob/master/src/stories/examples/keep-scale/example.tsx 
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 2,
        marginLeft: marker.x, //manipulates location ?
        marginTop: marker.y,
        }}>
        <KeepScale>
            <div className='pin' style={{backgroundColor: marker.color}}>
              <p>{marker.name}</p>
            </div>
        </KeepScale>
      </div>
      )) : <></> }
      
    </div>
  )
}

export default MapMarkers