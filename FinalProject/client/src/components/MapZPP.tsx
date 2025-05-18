import React, { useEffect, useRef, useState } from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import DockAdapter from './DockAdapter';
import ILocationMap from '../interfaces/ILocationMap';
import IWorldMap from '../interfaces/IWorldMap';
import MapMarkers from './MapMarkers';
import IMarker from '../interfaces/IMarker';
import MapTransformEffect from './MapTransformEffect';
import AddMarker from './AddMarker';
import ImageHandler from './ImageHandler';

interface incomingParams {
    imagePath?: string
    mapData?: IWorldMap | ILocationMap | undefined
}


const MapZPP: React.FC<incomingParams> = ({imagePath, mapData}) => {
    const currentFunction = useRef<string>("base")
    const [causeMarkerRerender, setCauseMarkerRerender] = useState<number>(0)
    const [markers, setMarkers] = useState<IMarker[]>([])
    const [showAddMarker, setShowAddMarker] = useState<{show: boolean, x: number, y: number}>({show:  false, x: 0, y: 0})
    const scale = useRef<number>(1)
    const markerInfo = useRef<{name: string, id: string, symbol: string, color: string, link: string} | undefined>(undefined)

    const baseClickFunction = (e: React.MouseEvent) => {
        const mapElement = document.getElementById('mapDiv')
        if(!mapElement){
            return
        }
        const { x, y } = mapElement.getBoundingClientRect()

        
        //(console.log("base/test", (e.clientX - x)/scale.current , (e.clientY - y)/scale.current, scale) works
    }

    const [clickFunction, setClickFunction] = useState<(e: React.MouseEvent) => (e: React.MouseEvent) => void>((e: React.MouseEvent) => baseClickFunction)
    
    const addMarkers = (e: React.MouseEvent) => {
        const mapElement = document.getElementById('mapDiv')
        if(!mapElement){return}
        const { x, y } = mapElement.getBoundingClientRect()
        setShowAddMarker({show: true, x: (e.clientX - x)/scale.current, y: (e.clientY - y)/scale.current})

    }
    
    const editMarkers = (e: React.MouseEvent, marker: IMarker) => {
        markerInfo.current = {
            name: marker.name ? marker.name: "", 
            id: marker._id, 
            symbol: marker.symbol ? marker.symbol : "",
            color: marker.color ? marker.color : "", 
            link: marker.linkToAnotherMap ? marker.linkToAnotherMap: "" }
        const mapElement = document.getElementById('mapDiv')
        if(!mapElement){return}
        const { x, y } = mapElement.getBoundingClientRect()
        setShowAddMarker({show: true, x: (e.clientX - x)/scale.current , y: (e.clientY - y)/scale.current})
    }

    const deleteMarkers = async (markerId: string) => {
        if(currentFunction.current !== "delete") return


        const incomingData = await fetch("/api/deleteMarker/" + markerId, {
            method: "delete",
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

    const changeClickFunction = (newClickFunction: string) => {
        setShowAddMarker({show: false, x:0, y:0})
        markerInfo.current = undefined

        if(newClickFunction !== currentFunction.current) {
            currentFunction.current = newClickFunction
            if(newClickFunction == "add"){
                setClickFunction(() => addMarkers)
            } else if (newClickFunction == "edit"){
                setClickFunction(() => baseClickFunction)
            } else if (newClickFunction == "delete"){
                setClickFunction(() => baseClickFunction)
            }
        }
        else {
            currentFunction.current = "base"
            setClickFunction(() => baseClickFunction)
        }

    }

    const handleMarkerClick = (e: React.MouseEvent, marker: IMarker) => {
        if(currentFunction.current === "edit"){
            editMarkers(e, marker)
        } else if ( currentFunction.current === "delete") {
            deleteMarkers(marker._id)
        } 
        return
    }

    const postMarker = async (form: FormData) => {
        const incomingData = await fetch("/api/marker", {
            method: "post",
            
            body: JSON.stringify({
                name: form.get('name'),
                x: showAddMarker.x,
                y: showAddMarker.y,
                color: form.get('color'),
                symbol: form.get('symbol'),
                mapThisBelongsTo: mapData?._id,
                linkToAnotherMap: form.get('link')
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
        setShowAddMarker({show:  false, x: 0, y: 0})
        setCauseMarkerRerender(causeMarkerRerender => causeMarkerRerender + 1)
    }

    const editMarker = async(form: FormData) => {
        const incomingData = await fetch("/api/updateMarker/" + markerInfo.current?.id, {
            method: "put",
            
            body: JSON.stringify({
                name: form.get('name'),
                x: showAddMarker.x,
                y: showAddMarker.y,
                color: form.get('color'),
                symbol: form.get('symbol'),
                mapThisBelongsTo: mapData?._id,
                linkToAnotherMap: form.get('link')
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
        markerInfo.current = undefined
        setShowAddMarker({show:  false, x: 0, y: 0})
        setCauseMarkerRerender(causeMarkerRerender => causeMarkerRerender + 1)
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
            // console.log("parsedData, markers", parsedData)
        }

        loadMarkers()
        
        return () => abortCtrl.abort()
    }, [causeMarkerRerender, mapData])

    return (
        <div >
            {showAddMarker.show ? <AddMarker edit={markerInfo.current} onSubmitFunc={(formData: FormData) => {
                if(currentFunction.current === "add"){
                    postMarker(formData)
                } else if (currentFunction.current === "edit"){
                    editMarker(formData)
                }
                
                
                }} coordinates={{x: showAddMarker.x, y: showAddMarker.y}}></AddMarker> : <></>}
            <TransformWrapper pinch={{step: 5}} minScale={0.1}>
                <TransformComponent wrapperStyle={{ maxWidth: "100%", maxHeight: "calc(100vh - 50px)" }}>
                    <div id='mapDiv' onClick={(e: React.MouseEvent) => {
                        console.log("click happened")
                        clickFunction(e)
                        }}
                        >
                        <ImageHandler src={imagePath} alt="test" />
                    </div>
                    
                    <MapMarkers markers={markers} markerClicked={(e: React.MouseEvent, marker: IMarker) => handleMarkerClick(e, marker)}></MapMarkers>
                </TransformComponent>
                <DockAdapter button1={() => changeClickFunction("add")} button2={() => changeClickFunction("edit")} button3={() => changeClickFunction("delete")}/>
                <MapTransformEffect readState={(arg: number) => {scale.current = arg}} />
            </TransformWrapper>
        </div>
    )
    }

export default MapZPP