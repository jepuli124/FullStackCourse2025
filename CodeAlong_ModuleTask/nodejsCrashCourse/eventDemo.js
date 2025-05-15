import { EventEmitter } from "events"

const emitter = new EventEmitter()

const hw = () => {
    console.log("hello world")
}

const bw = () => {
    console.log("byee world")
}

emitter.on('hw', hw)
emitter.on('bw', bw)
emitter.on('error', (e) => {
    console.log(e)

} )

emitter.emit('hw')
