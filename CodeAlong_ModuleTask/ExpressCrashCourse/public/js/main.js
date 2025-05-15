
async function getPosts() {
    const res = await fetch('http://localhost:8002/api/posts')

    console.log(await res.json())
}

async function postPosts() {

    const title = document.getElementById('posttext');

    const res = await fetch('http://localhost:8002/api/posts',  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: title.value }),
    }

    )

    console.log(await res.json())
}