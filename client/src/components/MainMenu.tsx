import React, { useEffect, useState } from 'react'

import IWorldMap from '../interfaces/IWorldMap.tsx'
import ILocationMap from '../interfaces/ILocationMap.tsx'

interface itemInterface {
  image: string,
  text: string
}


const MainMenu: React.FC = () => {

  const [worldMaps, setWorldMaps] = useState< itemInterface[]| undefined>(undefined)
  const [locationMaps, setLocationMaps] = useState< itemInterface[]| undefined>(undefined)

  const fetchMaps = async() =>{

    const incomingData1 = await fetch('/api/worldMaps')
    const incomingData2 = await fetch('/api/locationMaps')

    if(!incomingData1.ok || !incomingData2.ok){
      console.log("fetch failed")
    }

    const tempWorldMaps: IWorldMap[] = await incomingData1.json()
    const tempLocationMaps: ILocationMap[] = await incomingData2.json()
    const reconstructedWorldMaps: itemInterface[] = []
    const reconstructedLocationMaps: itemInterface[] = []

    tempWorldMaps.forEach((element) => {
      reconstructedWorldMaps.push({image: element.imageId, text: 
        element.name })
    })
    tempLocationMaps.forEach((element) => {
      reconstructedLocationMaps.push({image: element.imageId, text: 
        element.name })
    })

    setWorldMaps(reconstructedWorldMaps)
    setLocationMaps(reconstructedLocationMaps)
  }

  useEffect(() => {
        const abortCtrl: AbortController = new AbortController()
        
        fetchMaps()
        return () => abortCtrl.abort()
      }, [])

  return (
    <>
      <div>MainMenu</div>
      <div style={{ height: '600px', position: 'relative' }}>
        {worldMaps && worldMaps.length > 0 ? < ></> : <p>No world maps available</p> }
      </div>
      <div style={{ height: '600px', position: 'relative' }}>
      {locationMaps && locationMaps.length > 0 ? <></>: <p>No location maps available</p> }
      </div>
    </>
  )
}

export default MainMenu