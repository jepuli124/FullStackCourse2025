import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import IWorldMap from '../interfaces/IWorldMap'
import ILocationMap from '../interfaces/ILocationMap'
import DockAdapter from './DockAdapter'
import useDragObject from '../hooks/DragHook'
import '../css/basic.css'
import useWindowDimensions from '../hooks/WindowsDimensionHook'



const ShowMap: React.FC = () => {

    const maxZoom = 5 // declares maxium zoom possible either way

    const [mapData, setMapData] = useState<IWorldMap | ILocationMap | undefined>(undefined)
    const [imagePath, setImagePath] = useState<string | undefined> (undefined)
    
    const [naturalImageSize, setNaturalImageSize] = useState<{x: number, y: number}> ({x: 0, y: 0})
    const [zoom, setZoom] = useState<number> (0)

    const { cordinates, imageSize, dragObject, setCordinates, setImageSize } = useDragObject({left: 0, top: 0});
    const {width, height} = useWindowDimensions()
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

    const imgLoad = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLImageElement
        setImageSize({x: target.naturalWidth, y: target.naturalHeight})
        setNaturalImageSize({x: target.naturalWidth, y: target.naturalHeight})
    }

    const scrollSize = (e: React.SyntheticEvent) => {
        
        const event = e as unknown as WheelEvent // types are hard
        const direction = (event.deltaY/Math.abs(event.deltaY))
        const tempZoom = zoom + direction
        if(tempZoom > maxZoom){
            setZoom(maxZoom)
        } else if (tempZoom < -maxZoom) {
            setZoom(-maxZoom)
        }
        else {
            setCordinates({left: ((-0.125) * ((event.clientX + cordinates.left)* direction )) + cordinates.left, top: ((-0.125) * ((event.clientY+ cordinates.top) *direction )) + cordinates.top})
            setZoom(tempZoom)
        }
        
        setImageSize({x: naturalImageSize.x * (1 +(0.1 * zoom)), y: naturalImageSize.y * (1 +(0.1 * zoom))})

    }

    return (
        <div>
            <div style={{width: width * 0.995, height: height * 0.892, overflow: "hidden", left: 0, top: "10vh" , position:"absolute", border: "3px black solid"}}>
                <div style={{left: cordinates.left, top: cordinates.top,  position:"absolute"}}>
                {imagePath ? <img onDrag={(e: React.DragEvent) => dragObject(e)} src={imagePath} onLoad={(e: React.SyntheticEvent) => imgLoad(e)} onWheel={(e: React.SyntheticEvent) => scrollSize(e)} style={{width: imageSize.x, height: imageSize.y}}/> : <p>Image not found</p>}
                </div>
            </div>
            {/* <div style={{position:"absolute", left: "50vm", top: "15vh"}}>
                <h1> {mapData ? mapData.name : "fetching map data " } </h1>
                <h2> {mapData ? mapData.description : "" } </h2>
                <p> {mapData ? mapData.campain : "" } </p>
                <p> {mapData ? "" : "" } </p>
            </div> */}
            <DockAdapter />
        </div>
        
    )
}

export default ShowMap