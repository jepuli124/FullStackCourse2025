import React from 'react'

interface incomingParams{
    src?: string,
    alt?: string
}
//this is only to prevent unnecessary image loads
const ImageHandler: React.FC<incomingParams> = ({src, alt}) => {
  return (
    <div><img src={src} alt={alt} /></div>
  )
}

export default ImageHandler