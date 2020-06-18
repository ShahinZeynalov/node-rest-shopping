const http = require('http')
const app = require('./app')


const port = process.env.PORT || 3000
const server = http.createServer(app);

server.listen(port, () => {
    console.log('it works at 3000 port');
})
