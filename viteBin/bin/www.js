#! /usr/bin/env node
const createServer = require('../index')
createServer().listen(4000, () => {
    console.log('server start at 4000 port', 'http://localhost:4000')
})