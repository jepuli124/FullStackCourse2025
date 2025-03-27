import React from 'react'
import mapItem from '../interfaces/IMapItem'
import './basic.css'
import { Card } from '@mui/material'
import { useNavigate } from 'react-router-dom'
interface incomingParams {
    item: mapItem
}

const MapGallerySlot: React.FC<incomingParams> = ({item}) => {
  const navigate = useNavigate();

  return (
    <Card className='grid-one-center fill-height' >

      <div className='grid-one-center' onClick={() => navigate("/map/" + item.id)}>
      <img src={item.image}></img>
      <h1>{item.text}</h1>
      </div>

    </Card>

  )
}

export default MapGallerySlot