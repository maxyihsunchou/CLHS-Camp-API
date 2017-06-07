const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')()
const logger = require('koa-logger')
const mongoose = require('mongoose')
const helmet = require('koa-helmet')

mongoose.Promise = global.Promise

const apis = require('./routes/apis')

// error handler
onerror(app)

// middlewares
app.use(bodyparser)
app.use(json())
// app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(helmet())
app.use(helmet.hidePoweredBy({ setTo: 'HHVM' }))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(apis.routes(), apis.allowedMethods())

module.exports = app
