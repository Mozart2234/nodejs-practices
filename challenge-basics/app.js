const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
  const url = req.url
  const method = req.method

  if(method === 'GET') {
    res.setHeader('Content-Type', 'text/html');
    if(url === '/') {
      res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8"/>
          <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>NodeJS app</title>
        </head>
        <body>
          <h1>Hello world with node.js</h1>
          <form method="POST" action="/create-user">
            <input name="username" type="text"/>
            <input type="submit" />
          </form>
        </body>
        </html>
      `);
    }
    else if (url === '/users') {
      res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8"/>
          <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Document</title>
        </head>
        <body>
          <ul>
            <li>User 1</li>
            <li>User 2</li>
            <li>User 3</li>
          </ul>
        </body>
        </html>
      `);
    }
    res.end();
  }
  else if(method === 'POST') {
    if (url === '/create-user') {
      const data = [];
      req.on('data', (chunk) => {
        data.push(chunk)
      })

      return req.on('end', () => {
        const bufferParsed = Buffer.concat(data).toString();
        const username = bufferParsed.split('=')[1]
        console.log(username)
        res.setHeader('Content-Type', 'text/html');
        res.write(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Document</title>
          </head>
          <body>
            <h1>Hello ${username}</h1>
          </body>
          </html>
        `);
        res.end();
      })
    }
  }
})

server.listen(PORT)