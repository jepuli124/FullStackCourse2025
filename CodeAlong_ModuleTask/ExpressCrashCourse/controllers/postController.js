let posts = [
    {"id": 1},
    {"id": 2}
]

export const getPosts = (req, res, next) => {
    const limit = parseInt(req.query.limit)
    if(!isNaN(limit) && limit > 0){
        res.json(posts.slice(0, limit))
    } else {
        res.json(posts)
    }

}

export const getPost = (req, res, next) => {
    const id = parseInt(req.params["id"])

    const post = posts.filter((post) => post.id === id)

    if(!post) return res.status(404)

    res.json(post)

        
}

export const postPost = (req, res, next) => {
    posts.push(req.body.post)

    res.status(201)

        
}

export const putPost = (req, res, next) => {
    const id = parseInt(req.params["id"])
    

    posts.forEach((post) => {
        if(post.id === id) post = req.body.post
    })
    
    
    res.status(201)

        
}

export const delPost = (req, res, next) => {
    const id = parseInt(req.params["id"])
    posts = posts.filter((post) => post.id !== id)

    

    res.status(201)

        
}