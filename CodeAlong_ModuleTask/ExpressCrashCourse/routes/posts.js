import express from 'express'
import { delPost, getPost, getPosts, postPost, putPost } from '../controllers/postController.js'

const router = express.Router()


router.get('/', getPosts)

router.get('/:id', getPost)

router.post('/', postPost)

router.put('/:id', putPost)

router.delete('/:id', delPost)

export default router