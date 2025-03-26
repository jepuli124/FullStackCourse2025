import { Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import './basic.css';
import MapGallerySlot from './MapGallerySlot';
import mapItem from '../interfaces/IMapItem';


interface incomingParams {
    items: mapItem[]
    numberOfItems?: number
}

const MapGallery: React.FC<incomingParams> = ({items, numberOfItems = 6}) => {

  const [listIndex, setListIndex] = useState<number>(0)
  const [showableItems, setShowableItems] = useState<mapItem[]>([])
  

  useEffect(() => {
    const showItems = () =>{
      if(items.length == 0 || listIndex < 0){
        return
      }
      const tempMapItems: mapItem[] = []
      console.log(listIndex, items.length)
      for (let index = listIndex; numberOfItems >= tempMapItems.length-1; index++) { // goes through the list from the index until 6 maps are selected.
        while(index >= items.length){
          index -= items.length
        }
        const element = items[index];
        tempMapItems.push(element)
      }

  
      setShowableItems(tempMapItems)
    } 
    if(listIndex < 0){
      setListIndex(items.length - 1)
    }
    showItems()
      return () => setShowableItems([])
    }, [listIndex, items])
    
  return (
    <>
      <div>MapGallery</div>
      <Button onClick={() => setListIndex(listIndex => listIndex + 1)}>+1 index</Button>
      <Button onClick={() => setListIndex(listIndex => listIndex - 1)}>-1 index</Button>
      <div className='flex-single-row'>
        {showableItems.length > 0 ? showableItems.map((item, index) => (
          <MapGallerySlot key={index} item={item}  />
        )) : 
        <></>}
      </div>
    
    </>
    
  )
}

export default MapGallery