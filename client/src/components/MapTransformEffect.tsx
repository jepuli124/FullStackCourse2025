import React from 'react'
import { useTransformEffect } from 'react-zoom-pan-pinch'

interface incomingParams {
    readState?: (arg: number) => void
} 

const MapTransformEffect: React.FC<incomingParams> = ({readState}) => {

    useTransformEffect(({ state }) => {
        if(readState){
            readState(state.scale)
        }
        return () => {}
    })
    return (
        <>
        </>
    )
}

export default MapTransformEffect