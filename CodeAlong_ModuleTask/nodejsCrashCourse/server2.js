import {createServer} from 'http'
const PORT = process.env.PORT

const users = [
    {id: 1, name: "1"},
    {id: 2, name: "2"},
    {id: 3, name: "three"}
]

const log = (req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
  };
  

  const jsonMiddleware = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    next()
  };
  

  const getUsers = (req, res) => {
    res.write(JSON.stringify(users))
    res.end()
  };
  

  const getUserById = (req, res) => {
    const id = req.url.split('/')[3]
    const user = users.find((user) => user.id.toString() === id)
  
    if (user) {
      res.write(JSON.stringify(user))
    } else {
      res.statusCode = 404
      res.write(JSON.stringify({ message: 'user not found' }))
    }
    res.end()
  };
  

  const createUser = (req, res) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk.toString()
    });
    req.on('end', () => {
      const newUser = JSON.parse(body)
      users.push(newUser)
      res.statusCode = 201;
      res.write(JSON.stringify(newUser))
      res.end()
    });
  };
  
  
  const handle404 = (req, res) => {
    res.statusCode = 404
    res.write(JSON.stringify({ message: 'stuff not found' }))
    res.end()
  };

const server = createServer((req, res) => {
    log(req, res, () => {
      jsonMiddleware(req, res, () => {
        if (req.url === '/api/users' && req.method === 'GET') {
          getUsers(req, res);
        } else if ( req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
          getUserById(req, res)
        } else if (req.url === '/api/users' && req.method === 'POST') {
          createUser(req, res)
        } else {
          handle404(req, res)
        }
      });
    });
  });

server.listen((PORT), () => {
    console.log("Open on port ", PORT)
}
)
