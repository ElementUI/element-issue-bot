exports.headers = {
  'Authorization': `token ${ process.env.BOT_TOKEN }`,
  'User-Agent': 'element-bot'
}

exports.comment = {
  en: 'Hello, this issue has been closed because it does not conform to our issue requirements. Please submit issues with [issue-generator](https://elementui.github.io/issue-generator/#/en-US). More info can be found in #3693.',
  cn: '你好，因为本 issue 不符合我们的规范，所以被关闭了。请使用 [issue-generator](https://elementui.github.io/issue-generator/#/zh-CN) 提交 issue。相关信息：#3692。'
}
