const Koa = require('koa')
const bodyParser = require('koa-bodyparser')()
const request = require('koa-request')

const headers = require('./consts').headers
const comments = require('./consts').comment
const isChinese = require('./utils').isChinese
const isValid = require('./utils').isValid
const commentIssue = require('./github').commentIssue
const closeIssue = require('./github').closeIssue

const app = new Koa()

app.use(bodyParser)

app.use(async (ctx, next) => {
  const { action, issue } = ctx.request.body
  if (!issue) {
    ctx.body = 'This is not an issue.'
  } else if (action !== 'opened') {
    ctx.body = `This issue is ${ action }, so it does not need to be processed.`
  } else if (isValid(issue)) {
    ctx.body = 'This is a valid issue.'
  } else {
    await next()
  }
})

app.use(async (ctx, next) => {
  const { issue } = ctx.request.body

  let comment = comments.en
  if (isChinese(issue)) {
    comment = comments.cn
  }
  const options = {
    url: `https://api.github.com/repos/elemefe/element/issues/${ issue.number }/comments`,
    headers,
    body: `{"body": "${ comment }"}`
  }
  
  try {
    await commentIssue(options)
    await next()
  } catch(e) {
    ctx.body = `Error occurred when commenting! Code: ${ e.statusCode }`
  }
})

app.use(async ctx => {
  const number = ctx.request.body.issue.number
  const options = {
    url: `https://api.github.com/repos/elemefe/element/issues/${ number }`,
    headers,
    body: '{"state": "closed"}'
  }
  
  try {
    await closeIssue(options)
    ctx.body = 'Success!'
  } catch(e) {
    ctx.body = `Error occurred when closing! Code: ${ e.statusCode }`
  }
})

app.listen(3000)
