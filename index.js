const server = require('./api/server');

const port = 5500

server.listen(port, ()=>{
  console.log(`\n ***server is listening on port: ${port}*** \n`)
})