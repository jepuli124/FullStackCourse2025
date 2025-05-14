import React from 'react'
import mapItem from '../interfaces/IMapItem'
import '../css/basic.css'
import { Card } from '@mui/material'
import { useNavigate } from 'react-router-dom'
interface incomingParams {
    item: mapItem
}

const MapGallerySlot: React.FC<incomingParams> = ({item}) => {
  const navigate = useNavigate();

  return (
    <Card className='grid-one-center fill-height' >

      <div draggable={false}>
        <div className='grid-one-center' onClick={() => navigate("/map/" + item.id)} style={{position: "relative", width: "20vm", height:"30vh", overflow: "hidden"}}>
          <div >
            <img src={item.image} draggable={false}></img>
          </div>
        </div>
        <h1>{item.text}</h1>
      </div>
      

    </Card>

  )
}

export default MapGallerySlot