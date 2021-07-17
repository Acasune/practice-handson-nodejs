'use strict'
const { fork, setupMaster } = require('cluster')

console.log('Main process', process.pid)

setupMaster({ exec: `${__dirname}/web-app` })

const cpuCount = require('os').cpus().length
for (let i = 0; i < cpuCount; i++) {
  const sub = fork()
  console.log('Sub process', sub.process.pid)
  sub.send(3000)
  sub.on('message', ({ pid, response }) =>
    console.log(process.pid, `${pid} returns ${response}`))
}
