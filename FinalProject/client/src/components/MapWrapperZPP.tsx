import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

import IWorldMap from '../interfaces/IWorldMap';
import ILocationMap from '../interfaces/ILocationMap';
import MapZPP from './MapZPP';
import IMarker from '../interfaces/IMarker';



const MapWrapperZPP: React.FC = () => { // only fetches the map and passes data to MapZPP
    const params = useParams()
    const [imagePath, setImagePath] = useState<string | undefined> (undefined)
    const [mapData, setMapData] = useState<IWorldMap | ILocationMap | undefined>(undefined)
    
    

    useEffect(() => {
        const abortCtrl: AbortController = new AbortController()
        const fetchMapById = async () => {
            if(!params.id) return 
            const incomingData = await fetch('/api/map/id/' + params.id)
            if(!incomingData.ok){
                console.log("fetch failed")
            return
            }
            const parcedData: {worldMap?: IWorldMap, locationMap?: ILocationMap, mapImage?: string, markers?: IMarker[] }  = await incomingData.json()
            if(parcedData.worldMap){
                setMapData(parcedData.worldMap)
            } else if (parcedData.locationMap) {
                setMapData(parcedData.locationMap)
            }
            if(parcedData.mapImage){
                setImagePath(parcedData.mapImage)
            }
        }
        fetchMapById()
        return () => abortCtrl.abort()
    }, [params.id])

  return (
    <div style={{border: "3px black solid", width: "100%"}}>
        {imagePath ? <MapZPP imagePath={imagePath} mapData={mapData}/> : <></> }
    </div>
  )
}

export default MapWrapperZPP