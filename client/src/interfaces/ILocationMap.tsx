interface ILocationMap extends Document{
    name: string
    description: string
    imageId: string
    worldMapIDThisBelongsTo: string
    _id?: string
    campain: string
    tags: string[]
}

export default ILocationMap