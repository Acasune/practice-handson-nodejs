'use strict'
const fibonacci = require('../fibonacci')
const { workerData, parentPort } = require('worker_threads')

parentPort.on('message', n => parentPort.postMessage(fibonacci(n)))
