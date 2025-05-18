import React from 'react'

interface incomingParams {
    button?: string,
    text?: string,
    onClickParam?: () => void 
}

const Button: React.FC<incomingParams> = ({button = 'red', text = 'text', onClickParam}) => {
  return (
    <div>
        <button className='btn' 
            onClick={() => {
            if(onClickParam) {
            onClickParam()
            }}} 
            style={{backgroundColor: button }}>
            {text}
        </button>
        
    </div>
  )
}

export default Button