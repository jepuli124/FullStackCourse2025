import React from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import DockAdapter from './DockAdapter';
import ILocationMap from '../interfaces/ILocationMap';
import IWorldMap from '../interfaces/IWorldMap';
import MapMarkers from './MapMarkers';
import IMarker from '../interfaces/IMarker';


interface incomingParams {
    imagePath?: string
    mapData?: IWorldMap | ILocationMap | undefined
    markers?: IMarker[]
}

const MapZPP: React.FC<incomingParams> = ({imagePath, markers}) => {

    return (
        <div>
            <TransformWrapper pinch={{step: 5}}>
                <TransformComponent wrapperStyle={{ maxWidth: "100%", maxHeight: "calc(100vh - 50px)" }}>
                    <img src={imagePath} alt="test"/>
                    <MapMarkers markers={markers}></MapMarkers>
                </TransformComponent>
                <DockAdapter />
            </TransformWrapper>
        </div>
    )
    }

export default MapZPP