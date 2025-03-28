
import React, { useState } from "react"
import useWindowDimensions from './WindowsDimensionHook'

const useDragObject = (defaultCordinates: {left: number, top: number}) => { // this is the best code of my life
    const [cordinates, setCordinates] = useState<{left: number, top: number}> (defaultCordinates)
    const [mouseCordinates, setMouseCordinates] = useState<{left: number, top: number}> ({left: 0, top: 0})
    const [imageSize, setImageSize] = useState<{x: number, y: number}> ({x: 0, y: 0})
    const dimensions = useWindowDimensions()

    const howMuchOfImagebeforeStoppedX = 0.7
    const howMuchOfImageBeforeStoppedY = 0.8

    const dragObject = (e: React.DragEvent) => {
        if(mouseCordinates.left == 0 && mouseCordinates.top == 0){
            setMouseCordinates({left: e.clientX, top: e.clientY })
            return
        }
        if(e.clientX == 0 && e.clientY == 0){
            setMouseCordinates({left: e.clientX, top: e.clientY })
            return
        }
        
        let tempLeft = cordinates.left - (mouseCordinates.left - e.clientX)
        let tempTop = cordinates.top - (mouseCordinates.top - e.clientY)

        if(tempLeft > dimensions.width * howMuchOfImagebeforeStoppedX){
            tempLeft = dimensions.width * howMuchOfImagebeforeStoppedX
        } else if (tempLeft < defaultCordinates.left - (imageSize.x * howMuchOfImagebeforeStoppedX)) {
            tempLeft = defaultCordinates.left - (imageSize.x * howMuchOfImagebeforeStoppedX)
        }
        if(tempTop > dimensions.height * howMuchOfImageBeforeStoppedY){
            tempTop = dimensions.height * howMuchOfImageBeforeStoppedY
        } else if (tempTop < defaultCordinates.top - (imageSize.y * howMuchOfImageBeforeStoppedY)) {
            tempTop = defaultCordinates.top - (imageSize.y * howMuchOfImageBeforeStoppedY)
        }


        setCordinates({left: tempLeft, top: tempTop })
        setMouseCordinates({left: e.clientX, top: e.clientY })
    }
    

    return { cordinates, mouseCordinates, imageSize, dragObject, setCordinates, setImageSize };
}

export default useDragObject