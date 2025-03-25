import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import IWorldMap from '../interfaces/IWorldMap'
import ILocationMap from '../interfaces/ILocationMap'
import IImage from '../interfaces/IImage'


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
            const parcedData: {worldMap: IWorldMap, locationMap: ILocationMap, mapImage: IImage | undefined }  = await incomingData.json()
            if(parcedData.worldMap){
                setMapData(parcedData.worldMap)
            } else if (parcedData.locationMap) {
                setMapData(parcedData.locationMap)
            }
            if(parcedData.mapImage){
                setImagePath(parcedData.mapImage.path)
            }
        }
        fetchMapById()
        return () => abortCtrl.abort()
    }, [params])

    return (
        <>
            <div>
                <h1> {mapData ? mapData.name : "fetching map data " } </h1>
                <h2> {mapData ? mapData.description : "" } </h2>
                <p> {mapData ? mapData.campain : "" } </p>
                <p> {mapData ? "" : "" } </p>
                {imagePath ? <img src={imagePath} /> : <p>Image not found</p>}
            </div>
        </>
        
    )
}

export default ShowMap