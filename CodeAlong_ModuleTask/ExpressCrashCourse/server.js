import path from 'path';
import express from 'express'
import url from 'url';
import postsRouter from './routes/posts.js'
import logger from './middleware/logger.js'
import errorHandler from './middleware/error.js'
import notFound from './middleware/notFound.js'

const app = express();

const PORT = process.env.PORT || 8002

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(logger)
app.use(notFound)
app.use(errorHandler)

app.use(express.static(path.join(__dirname, 'public')))
app.use('/api/posts', postsRouter)
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

// app.get('/about', (req, res) => {
//     res.send('about')
// })


app.listen(PORT, () => {
    console.log("Running on", PORT)
})