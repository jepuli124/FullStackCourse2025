import React from 'react'
import mapItem from '../interfaces/IMapItem'
import './basic.css'
import { Card } from '@mui/material'
interface incomingParams {
    item: mapItem
}

const MapGallerySlot: React.FC<incomingParams> = ({item}) => {
  return (
    <Card className='grid-one-center'>
        <a href={"/map/" + item?.id}>
            <div className='grid-one-center'>
            <img src={item.image}></img>
            <h1>{item.text}</h1>
            </div>
        </a>
    </Card>

  )
}

export default MapGallerySlot