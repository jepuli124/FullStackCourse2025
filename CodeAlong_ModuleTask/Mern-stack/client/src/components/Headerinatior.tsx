import React from 'react'

interface incomingParams {
    props?: string
}

const Header: React.FC<incomingParams> = ( {props} ) => {
  return (
    <div >
        <p style={{color : 'red'}}>
            {props ? props : "title here"}
        </p>
    </div>
  )
}

export default Header