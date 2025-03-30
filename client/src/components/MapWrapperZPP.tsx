import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

import IWorldMap from '../interfaces/IWorldMap';
import ILocationMap from '../interfaces/ILocationMap';

//import useWindowDimensions from '../hooks/WindowsDimensionHook';
import MapZPP from './MapZPP';


const MapWrapperZPP: React.FC = () => {

    const [imagePath, setImagePath] = useState<string | undefined> (undefined)
    const [mapData, setMapData] = useState<IWorldMap | ILocationMap | undefined>(undefined)
    // const {width, height} = useWindowDimensions()
    
    const params = useParams()

    useEffect(() => {
        const abortCtrl: AbortController = new AbortController()
        const fetchMapById = async () => {
        
            const incomingData = await fetch('/api/map/id/' + params.id)
            if(!incomingData.ok){
                console.log("fetch failed")
            return
            }
            const parcedData: {worldMap: IWorldMap, locationMap: ILocationMap, mapImage: string }  = await incomingData.json()
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
    }, [params])

  return (
    <div>
        
        <div>
            {/* <div style={{width: width * 0.995, height: height * 0.892, overflow: "hidden", left: 0, top: "10vh" , position:"absolute", border: "3px black solid"}}>
                
            </div> */}
            {imagePath ? <MapZPP imagePath={imagePath} mapData={mapData}/> : <></> }
            
        </div>
    </div>
  )
}

export default MapWrapperZPP