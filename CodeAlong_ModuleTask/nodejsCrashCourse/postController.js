const posts = [
    { id: 1, title: "one" },
    { id: 2, title: "not one"}
]

const getPosts = () => {
    return posts
}

export const getLength = () => posts.length() 

export default getPosts