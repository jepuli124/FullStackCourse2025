import React from 'react'
import '../css/basic.css'
import MapGallerySlot from './MapGallerySlot';
import mapItem from '../interfaces/IMapItem';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

interface incomingParams {
    items: mapItem[]
}

const MapGallery: React.FC<incomingParams> = ({items}) => {

  return (
    <>
      <Carousel
        infinite={true} responsive={responsive} draggable={true} swipeable={true}
      >{items.map((item, index) => (
        <MapGallerySlot key={index} item={item}  />
      ))}</Carousel>
    </>
  )
}

export default MapGallery