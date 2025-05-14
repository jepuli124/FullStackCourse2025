import url from 'url'

const urlString = 'https://www.youtube.com/watch?v=32M1al-Y6Ag';


const urlObj = new URL(urlString)

console.log(urlObj)

console.log(url.format(urlObj))

console.log(import.meta.url)

console.log(url.fileURLToPath(import.meta.url))

console.log(urlObj.search)

const params = new URLSearchParams(urlObj.search)
console.log(params.get('watch'))
params.append('limit', '5')
//params.delete('limit')
console.log(params)