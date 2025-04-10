import React from 'react'
import { KeepScale } from 'react-zoom-pan-pinch'
import IMarker from '../interfaces/IMarker'

interface incomingParams {
    marker: IMarker
}

const MapMarker: React.FC<incomingParams> = ({marker}) => {
  return (
    <div
        
        style={{ // from https://github.com/BetterTyped/react-zoom-pan-pinch/blob/master/src/stories/examples/keep-scale/example.tsx 
        position: "absolute",
        top: "0%",
        left: "0%",
        transform: "translate(-50%, -50%)",
        zIndex: 20,
        marginLeft: marker.x, //manipulates location ?
        marginTop: marker.y
        }}>
        <KeepScale>
            <div className='pin' style={{backgroundColor: marker.color}}>
              <p>{marker.name}</p>
            </div>
        </KeepScale>
      </div>
  )
}

export default MapMarker