
import React, { useState } from "react"
import useWindowDimensions from './WindowsDimensionHook'

const useDragObject = (defaultCordinates: {left: number, top: number}) => { // this is the best code of my life
    const [cordinates, setCordinates] = useState<{left: number, top: number}> (defaultCordinates)
    const [mouseCordinates, setMouseCordinates] = useState<{left: number, top: number}> ({left: 0, top: 0})
    const [imageSize, setImageSize] = useState<{x: number, y: number}> ({x: 0, y: 0})
    const dimensions = useWindowDimensions()

    

    const preventGoingOffScreen = (tempLeft: number, tempTop: number) => {
        const howMuchOfImagebeforeStoppedLeft = 0.7
        const howMuchOfImageBeforeStoppedTop = 0.8
        const howMuchOfImagebeforeStoppedRight = 0.1
        const howMuchOfImageBeforeStoppedDown = 0.1
        if(tempLeft > dimensions.width * howMuchOfImagebeforeStoppedRight){
            tempLeft = dimensions.width * howMuchOfImagebeforeStoppedRight
        } else if (tempLeft < defaultCordinates.left - (imageSize.x * howMuchOfImagebeforeStoppedLeft)) {
            tempLeft = defaultCordinates.left - (imageSize.x * howMuchOfImagebeforeStoppedLeft)
        }
        if(tempTop > dimensions.height * howMuchOfImageBeforeStoppedDown){
            tempTop = dimensions.height * howMuchOfImageBeforeStoppedDown
        } else if (tempTop < defaultCordinates.top - (imageSize.y * howMuchOfImageBeforeStoppedTop)) {
            tempTop = defaultCordinates.top - (imageSize.y * howMuchOfImageBeforeStoppedTop)
        }
        return { tempLeft, tempTop }
    }

    const dragObject = (e: React.DragEvent) => {
        if(mouseCordinates.left == 0 && mouseCordinates.top == 0){
            setMouseCordinates({left: e.clientX, top: e.clientY })
            return
        }
        if(e.clientX == 0 && e.clientY == 0){
            setMouseCordinates({left: e.clientX, top: e.clientY })
            return
        }
        
        const {tempLeft, tempTop} = preventGoingOffScreen(cordinates.left - (mouseCordinates.left - e.clientX), cordinates.top - (mouseCordinates.top - e.clientY))

        setCordinates({left: tempLeft, top: tempTop })
        setMouseCordinates({left: e.clientX, top: e.clientY })
    }
    

    return { cordinates, mouseCordinates, imageSize, dragObject, setCordinates, setImageSize, preventGoingOffScreen };
}

export default useDragObject