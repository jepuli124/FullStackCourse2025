import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

import IWorldMap from '../interfaces/IWorldMap';
import ILocationMap from '../interfaces/ILocationMap';
import MapZPP from './MapZPP';
import IMarker from '../interfaces/IMarker';


const MapWrapperZPP: React.FC = () => { // only fetches the map and passes data to MapZPP

    const [imagePath, setImagePath] = useState<string | undefined> (undefined)
    const [mapData, setMapData] = useState<IWorldMap | ILocationMap | undefined>(undefined)
    const [markers, setMarkers] = useState<IMarker[] | undefined>(undefined)
    
    const params = useParams()

    useEffect(() => {
        const abortCtrl: AbortController = new AbortController()
        const fetchMapById = async () => {
        
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
            if(parcedData.markers){
                setMarkers(parcedData.markers)
            }
        }
        fetchMapById()
        return () => abortCtrl.abort()
    }, [params])

  return (
    <div style={{border: "3px black solid"}}>
        {imagePath ? <MapZPP imagePath={imagePath} mapData={mapData} markers={markers}/> : <></> }
    </div>
  )
}

export default MapWrapperZPP