const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url
  const method = req.method

  if(url === "/"){
    res.setHeader('Content-Type', 'text/html');
    res.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>A Document</title>
      </head>
      <body>
        <h1>Hello world from node.js App</h1>
        <form action="/message" method="POST">
          <input type="text" name="message"/>
          <input type="submit" />
        </form>
      </body>
      </html>
    `)
    res.end();
  }
  else if(url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFileSync('message.txt', message)
      res.statusCode = '302';
      res.setHeader('Location', '/')
      return res.end();
    });
  }
}

module.exports = requestHandler;
  