import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import IWorldMap from '../interfaces/IWorldMap'
import ILocationMap from '../interfaces/ILocationMap'
import DockAdapter from './dockAdapter'

const ShowMap: React.FC = () => {

    const [mapData, setMapData] = useState<IWorldMap | ILocationMap | undefined>(undefined)
    const [imagePath, setImagePath] = useState<string | undefined> (undefined)
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
            <div style={{position:"static"}}>
                <h1> {mapData ? mapData.name : "fetching map data " } </h1>
                <h2> {mapData ? mapData.description : "" } </h2>
                <p> {mapData ? mapData.campain : "" } </p>
                <p> {mapData ? "" : "" } </p>
            </div>
            <div>
                {imagePath ? <img src={imagePath} style={{left:"0px", top:"620px", margin: "20px",  position:"absolute"}}/> : <p>Image not found</p>}
            </div>
            <DockAdapter />
        </div>
        
    )
}

export default ShowMap