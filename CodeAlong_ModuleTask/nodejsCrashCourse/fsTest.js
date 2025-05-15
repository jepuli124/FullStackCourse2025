import fs from 'fs'

const readFile = () => {
    rs.readFile('./txt.txt', 'uft8', (err, data) => {
        if (err) {
            throw err
        }
        console.log(data)
    });
}

const writeFile = async () => {
    try{
        await fs.writeFile()
    } catch (e) {
        console.log(e)
    }
    
}

const appendFile = async () => {
    try{
        await fs.appendFile('txt.txt', 'uft8')
    } catch (e) {
        console.log(e)
    }
    
}