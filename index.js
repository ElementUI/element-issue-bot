const Koa = require('koa')
const bodyParser = require('koa-bodyparser')()
const logger = require('koa-logger')

const comments = require('./consts').comment
const { addAssignees, translate, referToFaq, notifyEmptyFiddle } = require('./service')
const util = require('./utils')
const github = require('./github')

const config = {
  enableAssign: false
}

const app = new Koa()

app.use(logger())
app.use(bodyParser)

app.use(async (ctx, next) => {
  const { action, issue } = ctx.request.body
  if (!issue) {
    ctx.body = 'This is not an issue.'
    return
  }

  if (config.enableAssign && action === 'labeled') {
    await addAssignees(ctx, issue)
    return
  }

  if (action !== 'opened') {
    ctx.body = `This issue is ${ action }, so it does not need to be processed.`
    return
  }

  if (util.isValid(issue)) {
    ctx.body = 'This is a valid issue.'

    if (util.isChinese(issue)) {
      await translate(ctx, issue)
    }

    if (util.isKeyEvent(issue) || util.isIconDemand(issue)) {
      await referToFaq(ctx, issue)
    } else if (util.isInvalidFiddle(issue)) {
      await notifyEmptyFiddle(ctx, issue)
    }
    return
  }

  ctx.body = 'This issue is invalid.'
  await next()
})

app.use(async (ctx, next) => {
  const { issue } = ctx.request.body
  const comment = comments.close.en
  try {
    await github.commentIssue(issue, comment)
    await next()
  } catch(e) {
    ctx.body += ` Error occurred when commenting: ${ e.statusCode }`
  }
})

app.use(async (ctx, next) => {
  const { issue } = ctx.request.body
  const labels = '["invalid"]'
  try {
    await github.addLabels(issue, labels)
    await next()
  } catch(e) {
    ctx.body += ` Error occurred when adding labels: ${ e.statusCode }`
  }
})

app.use(async ctx => {
  const { issue } = ctx.request.body
  try {
    await github.closeIssue(issue)
    ctx.body += ' Closed successfully.'
  } catch(e) {
    ctx.body += ` Error occurred when closing: ${ e.statusCode }`
  }
})

app.listen(3000)
