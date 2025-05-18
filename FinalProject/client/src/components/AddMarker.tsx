import React from 'react'
import '../css/colors.css'

interface incomingParams {
    onSubmitFunc?: (formData: FormData) => void
    coordinates: {x: number, y: number}
    edit?: {name: string, id: string, symbol: string, color: string, link: string}
}

const AddMarker: React.FC<incomingParams> = ({onSubmitFunc, coordinates, edit}) => {
   
  return (
    <div className='primary-border-color' style={{ // from https://github.com/BetterTyped/react-zoom-pan-pinch/blob/master/src/stories/examples/keep-scale/example.tsx 
        position: "absolute",
        top: "0%",
        left: "0%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgb(28, 47, 65)",
        borderRadius: "2rem",
        border: "0.5rem solid",
        zIndex: 20,
        marginLeft: coordinates.x, //manipulates location ?
        marginTop: coordinates.y
        }}>
        <form className='grid-one-center' id='markerForm' onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault()
            const form = document.getElementById("markerForm") as HTMLFormElement
            const formData = new FormData(form)
            if(onSubmitFunc) {
                onSubmitFunc(formData)
            }
        }}>
            <label htmlFor="name" >Name:</label>
            <input type="text" name='name' defaultValue={edit?.name} />
            <label htmlFor="symbol">Symbol:</label>
            <input type="text" name='symbol' defaultValue={edit?.symbol}/>
            <label htmlFor="color">Color:</label>
            <input type="text" name='color' defaultValue={edit?.color}/>
            <label htmlFor="link">Link:</label>
            <input type="text" name='link' defaultValue={edit?.link}/>
            <input type="submit" value={edit ? "add/edit marker": "edit marker"}/>
        </form>
    </div>
  )
}

export default AddMarker