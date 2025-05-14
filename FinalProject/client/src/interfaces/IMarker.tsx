interface IMarker {
    name?: string
    x: number
    y: number
    color?: string
    symbol?: string
    mapThisBelongsTo?: string
    linkToAnotherMap?: string
    _id: string
}

export default IMarker
    