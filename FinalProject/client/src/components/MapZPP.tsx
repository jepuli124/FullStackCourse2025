import React, { useEffect, useRef, useState } from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import DockAdapter from './DockAdapter';
import ILocationMap from '../interfaces/ILocationMap';
import IWorldMap from '../interfaces/IWorldMap';
import MapMarkers from './MapMarkers';
import IMarker from '../interfaces/IMarker';
import MapTransformEffect from './MapTransformEffect';


interface incomingParams {
    imagePath?: string
    mapData?: IWorldMap | ILocationMap | undefined
}


const MapZPP: React.FC<incomingParams> = ({imagePath, mapData}) => {
    const [currentFunction, setCurrentFunction] = useState<string>("base")
    const [causeMarkerRerender, setCauseMarkerRerender] = useState<number>(0)
    const [markers, setMarkers] = useState<IMarker[]>([])
    const scale = useRef<number>(1)

    const baseClickFunction = (e: React.MouseEvent) => {
        const mapElement = document.getElementById('mapDiv')
        if(!mapElement){
            return
        }
        const { x, y } = mapElement.getBoundingClientRect()
        console.log("base/test", (e.clientX - x)/scale.current , (e.clientY - y)/scale.current, scale)
    }

    const [clickFunction, setClickFunction] = useState<(e: React.MouseEvent) => (e: React.MouseEvent) => void>((e: React.MouseEvent) => baseClickFunction)
    
    const addMarkers = async (e: React.MouseEvent) => {
        const mapElement = document.getElementById('mapDiv')
        if(!mapElement){
            return
        }
        const { x, y } = mapElement.getBoundingClientRect()

        const incomingData = await fetch("/api/marker", {
            method: "post",
            body: JSON.stringify({
                name: "aa",
                x: (e.clientX - x)/scale.current,
                y: (e.clientY - y)/scale.current,
                color: "#f66f6f",
                symbol: "",
                mapThisBelongsTo: mapData?._id,
                linkToAnotherMap: ""
            }),
            headers: {
                "authorization": `Bearer ${localStorage.getItem("sessionToken")}`,
                "Content-Type": "application/json"
            },
        });

        if(!incomingData){
            console.log("error")
            return
        }
        setCauseMarkerRerender(causeMarkerRerender => causeMarkerRerender + 1)
    }
    
    const editMarkers = (e: React.MouseEvent) => {
        console.log("editMarkers")
    }

    const deleteMarkers = (e: React.MouseEvent) => {
        console.log("deleteMarkers")
    }

    const changeClickFunction = (newClickFunction: string) => {


        if(newClickFunction !== currentFunction) {
            setCurrentFunction(newClickFunction)
            if(newClickFunction == "add"){
                setClickFunction(() => addMarkers)
            } else if (newClickFunction == "edit"){
                setClickFunction(() => editMarkers)
            } else if (newClickFunction == "delete"){
                setClickFunction(() => deleteMarkers)
            }
        }
        else {
            setCurrentFunction("base")
            setClickFunction(() => baseClickFunction)
        }
    }

    

    useEffect(() => {
        const abortCtrl: AbortController = new AbortController()

        const loadMarkers = async () => {
            const incomingData = await fetch("/api/maps/markers/" + mapData?._id, {
                method: "get",
                headers: {
                    "authorization": `Bearer ${localStorage.getItem("sessionToken")}`
                },
            });
    
            if(!incomingData){
                console.log("error in marker fetching")
                return
            }
            const parsedData = await incomingData.json()
            setMarkers(parsedData)
            console.log(parsedData)
        }

        loadMarkers()
        
        return () => abortCtrl.abort()
    }, [causeMarkerRerender, mapData])

    return (
        <div >
            <TransformWrapper pinch={{step: 5}} minScale={0.1}>
                <TransformComponent wrapperStyle={{ maxWidth: "100%", maxHeight: "calc(100vh - 50px)" }}>
                    <div id='mapDiv' onClick={(e: React.MouseEvent) => {
                        console.log("click happened")
                        clickFunction(e)
                        }}
                        >
                        <img src={imagePath} alt="test" />
                    </div>
                    
                    <MapMarkers markers={markers}></MapMarkers>
                </TransformComponent>
                <DockAdapter button1={() => changeClickFunction("add")} button2={() => changeClickFunction("edit")} button3={() => changeClickFunction("delete")}/>
                <MapTransformEffect readState={(arg: number) => {scale.current = arg}} />
            </TransformWrapper>
        </div>
    )
    }

export default MapZPP